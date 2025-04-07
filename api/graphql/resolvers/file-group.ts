import { Env } from "../../env";
import { Nautico } from "../../../models";

export const FILE_GROUP_TABLE_NAME = `file_group`;

type FileGroup = Nautico.FileGroup;

export async function getFileGroups(
  _: unknown,
  args: GetFileGroupsArgs,
  env: Env,
): Promise<Array<FileGroup>> {
  const { direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM ${FILE_GROUP_TABLE_NAME}
    ORDER BY created_at ${direction}`;
  const { results } = await DB.prepare(query).all();

  const fileGroups = results.map(toFileGroup);
  for (const fileGroup of fileGroups) {
    if (!fileGroup.directory) {
      continue;
    }
    await getFiles(fileGroup, env);
  }

  return fileGroups;
}

interface GetFileGroupsArgs {
  direction?: "asc" | "desc";
}

export async function getFileGroup(
  _: unknown,
  args: GetFileGroupArgs,
  env: Env,
): Promise<FileGroup | null> {
  const { id } = args;
  const { DB } = env;
  if (id === undefined) {
    throw new Error("You must specify an id");
  }

  const query = `SELECT * FROM ${FILE_GROUP_TABLE_NAME}
    WHERE id = ${id} LIMIT 1;`;

  const { results } = await DB.prepare(query).all();

  if (!results.length) {
    return null;
  }

  const fileGroup = toFileGroup(results[0]);
  await getFiles(fileGroup, env);

  return fileGroup;
}

interface GetFileGroupArgs {
  id: number;
}

async function getFiles(group: FileGroup, env: Env) {
  const { directory } = group;
  const { BUCKET, BUCKET_DOMAIN } = env;
  const { objects } = await BUCKET.list({
    prefix: directory,
  });

  group.files = objects.map((obj) => {
    const { etag, key, version, size, uploaded } = obj;
    return {
      id: etag,
      key,
      version,
      size,
      uploaded,
      url: `${BUCKET_DOMAIN}/${key}`,
    };
  });
}

function toFileGroup(row: Record<string, unknown>): FileGroup {
  const { id, name, directory, created_at } = row;

  return {
    id: parseInt(`${id}`),
    name: name ? `${name}` : "",
    directory: `${directory}`,
    date: new Date(`${created_at}`),
    files: [],
  };
}
