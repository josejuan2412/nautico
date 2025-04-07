import { Env } from "../../env";
import { Nautico } from "../../../models";

type FileGroup = Nautico.FileGroup;

export async function getFileGroups(
  _: unknown,
  args: GetFileGroupsArgs,
  env: Env,
): Promise<Array<FileGroup>> {
  const { direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM file_group ORDER BY created_at ${direction}`;
  const { results } = await DB.prepare(query).all();

  const fileGroups = results.map(toFileGroup);
  for (const group of fileGroups) {
    if (!group.directory) {
      continue;
    }
    await getFiles(group, env);
  }

  return fileGroups;
}

interface GetFileGroupsArgs {
  direction?: "asc" | "desc";
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
