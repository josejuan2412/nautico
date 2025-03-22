import { Event } from "../../../models/Event";
import { Group } from "../../../models/Group";
import { Env } from "../../env";

export async function getGroups(
  event: Event,
  args: GetGroupArgs,
  env: Env,
): Promise<Array<Group>> {
  const { id } = event;
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM event_group
    WHERE event_id = ? ORDER BY  ${orderBy} ${direction};`;
  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(mapToGroup);
}

export interface GetGroupArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

function mapToGroup(row: Record<string, unknown>): Group {
  const { id, name, position, date, directory } = row;
  return {
    id: parseInt(`${id}`),
    name: name ? `${name}` : "",
    directory: `${directory}`,
    position: position as number,
    date: new Date(`${date}`),
  };
}
