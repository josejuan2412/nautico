import { Env } from "../../env";
import { Nautico } from "../../../models";

type Event = Nautico.Event;

export async function getEvents(
  _: unknown,
  args: GetEventsArgs,
  env: Env,
): Promise<Array<Event>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM event ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(toEvent);
}

export interface GetEventsArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getEventById(
  _: unknown,
  args: GetEventArgs,
  env: Env,
): Promise<Event | null> {
  const { id } = args;
  const { DB } = env;

  const query = `SELECT * FROM event WHERE id = ?`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  if (!results.length) {
    return null;
  }

  return results.map(toEvent)[0];
}

interface GetEventArgs {
  id: number;
}

function toEvent(row: Record<string, unknown>): Event {
  const { id, name, position, date } = row;

  return {
    id: parseInt(`${id}`),
    name: name ? `${name}` : "",
    position: position as number,
    date: new Date(`${date}`),
  };
}
