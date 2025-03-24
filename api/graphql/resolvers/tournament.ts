import { Env } from "../../env";
import { Nautico } from "../../../models";

export async function getTournaments(
  _: unknown,
  args: GetTournamentsArgs,
  env: Env,
): Promise<Array<Nautico.Tournament>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM tournament ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(toTournament);
}

interface GetTournamentsArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getTournamentById(
  _: unknown,
  args: GetTournamentArgs,
  env: Env,
): Promise<Nautico.Tournament | null> {
  const { id } = args;
  const { DB } = env;

  const query = `SELECT * FROM tournament WHERE id = ?`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  if (!results.length) {
    return null;
  }

  return results.map(toTournament)[0];
}

interface GetTournamentArgs {
  id: number;
}

function toTournament(row: Record<string, unknown>): Nautico.Tournament {
  const { id, name, slug, position, date, created_at } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    slug: `${slug || ""}`,
    position: parseInt(`${position}`),
    date: new Date(`${date}`),
    createdAt: new Date(`${created_at}`),
  };
}
