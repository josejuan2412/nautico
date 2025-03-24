import { Env } from "../../env";
import { Nautico } from "../../../models";

export async function getFishermanFromTournament(
  tournament: Nautico.Tournament,
  args: GetFishermansArgs,
  env: Env,
): Promise<Array<Nautico.Tournament.Fisherman>> {
  const { id } = tournament;
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `
    SELECT
        *
    FROM
        tournament_fisherman
    WHERE
        tournament_id = ?
    ORDER BY
        ${orderBy} ${direction};`;

  const { results } = await DB.prepare(query).bind(id).all();

  return results.map(mapToFisherman);
}

interface GetFishermansArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getFishermanFromEntry(
  entry: Nautico.Tournament.Entry,
  _: unknown,
  env: Env,
): Promise<Nautico.Tournament.Fisherman | null> {
  const { id } = entry;
  const { DB } = env;

  const query = `
  SELECT
      tf.*
  FROM
      tournament_entry te
      LEFT JOIN tournament_fisherman tf ON (te.tournament_fisherman_id = tf.id)
  WHERE
      te.id = ?;`;

  const { results } = await DB.prepare(query).bind(id).all();
  if (!results.length) {
    return null;
  }

  return mapToFisherman(results[0]);
}

function mapToFisherman(
  row: Record<string, unknown>,
): Nautico.Tournament.Fisherman {
  const { id, name, is_enabled, created_at } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    isEnabled: parseInt(`${is_enabled}`) ? true : false,
    createdAt: new Date(`${created_at}`),
  };
}
