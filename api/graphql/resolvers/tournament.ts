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

  return results.map(mapToTournament);
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

  return results.map(mapToTournament)[0];
}

interface GetTournamentArgs {
  id: number;
}

export async function getEntriesFromTournament(
  tournament: Nautico.Tournament,
  args: GetTournamentArgs,
  env: Env,
): Promise<Array<Nautico.Tournament.Entry>> {
  const { id } = tournament;
  const { DB } = env;

  const query = `
    SELECT
        *
    FROM
        tournament_entry
    WHERE
        tournament_id = ?
    ORDER BY
        "value" DESC,
        created_at ASC;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(mapToEntry);
}

interface GetTournamentArgs {
  direction?: "asc" | "desc";
}

function mapToTournament(row: Record<string, unknown>): Nautico.Tournament {
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

function mapToEntry(row: Record<string, unknown>): Nautico.Tournament.Entry {
  const { id, value, createdAt } = row;
  return {
    id: parseInt(`${id}`),
    value: parseFloat(`${value}`),
    createdAt: new Date(`${createdAt}`),
  };
}
