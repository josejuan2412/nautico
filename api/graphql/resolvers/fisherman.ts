import { GraphQLError } from "graphql";
import { Env } from "../../env";
import { Nautico } from "../../../models";
/* QUERY RESOLVERS */
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

/*MUTATION RESOLVERS */
/*export async function fishermanCreate(
  _: unknown,
  args: { tournamentId: number; input: FishermanInput },
  env: Env,
): Promise<Nautico.Tournament.Fisherman> {

}

interface FishermanInput {

}*/

export async function fishermanDelete(
  _: unknown,
  args: { id: number },
  env: Env,
): Promise<number | null> {
  const { id } = args;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot delete a fisherman because required property 'id' is missing`,
    );
  }

  const query = `
    DELETE FROM tournament_fisherman WHERE id = ? RETURNING *;
  `;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }
  return id;
}

function toFisherman(
  row: Record<string, unknown>,
): Nautico.Tournament.Fisherman {
  const { id, name, is_enabled, created_at, email } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    email: typeof email === "string" ? email : null,
    isEnabled: parseInt(`${is_enabled}`) ? true : false,
    createdAt: new Date(`${created_at}`),
  };
}
