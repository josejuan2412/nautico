import hono from "hono";
import { Env } from "../../env";
import { Event } from "../../../models/Event";
import { env } from "hono/adapter";

export async function getEvents(
  args: GetEventsArgs,
  c: hono.Context<hono.Env, never, object>,
): Promise<Array<Event>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env<Env>(c);

  const query = `SELECT * FROM event ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(mapToEvent);
}

export interface GetEventsArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getEventById(
  args: GetEventArgs,
  c: hono.Context<hono.Env, never, object>,
): Promise<Event | null> {
  const { id } = args;
  const { DB } = env<Env>(c);

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

function mapToEvent(row: Record<string, unknown>): Event {
  const { id, name, position, date } = row;

  return {
    id: parseInt(`${id}`),
    name: name ? `${name}` : "",
    position: position as number,
    date: new Date(`${date}`),
  };
}
