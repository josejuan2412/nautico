import { Env } from "../../env";
import { Nautico } from "../../../models";

export async function getEvents(
  _: unknown,
  args: GetEventsArgs,
  env: Env,
): Promise<Array<Nautico.Event>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM event ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(mapToEvent);
}

export interface GetEventsArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getEventById(
  _: unknown,
  args: GetEventArgs,
  env: Env,
): Promise<Nautico.Event | null> {
  const { id } = args;
  const { DB } = env;

  const query = `SELECT * FROM event WHERE id = ?`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  if (!results.length) {
    return null;
  }

  return results.map(mapToEvent)[0];
}

interface GetEventArgs {
  id: number;
}

function mapToEvent(row: Record<string, unknown>): Nautico.Event {
  const { id, name, position, date } = row;

  return {
    id: parseInt(`${id}`),
    name: name ? `${name}` : "",
    position: position as number,
    date: new Date(`${date}`),
  };
}
