import { Env } from "../../env";
import { Nautico } from "../../../models";

export async function getFishermansFromTournament(
  tournament: Nautico.Tournament,
  _: unknown,
  env: Env,
): Promise<Array<Nautico.Tournament.Fisherman>> {
  const { id } = tournament;
  const { DB } = env;

  const query = `
    SELECT
        *
    FROM
        tournament_fisherman
    WHERE
        tournament_id = ?;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(toFisherman);
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

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }

  return toFisherman(results[0]);
}

function toFisherman(
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
