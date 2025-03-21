import hono from "hono";
import { Env } from "../../env";
import { Event } from "../../../models/Event";
import { env } from "hono/adapter";

export async function getEvents(
  args: GetEventArgs,
  c: hono.Context<hono.Env, never, object>,
): Promise<Array<Event>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env<Env>(c);

  const query = `
    SELECT
      id,
      name,
      position,
      date(date) as date
    FROM event
    ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map((row): Event => {
    const { id, name, position, date } = row;

    return {
      id: parseInt(`${id}`),
      name: name ? `${name}` : "",
      position: position as number,
      date: new Date(`${date}`),
    };
  });
}

export interface GetEventArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}
