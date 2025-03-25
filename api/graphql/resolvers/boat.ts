import { GraphQLError } from "graphql";
import { Env } from "../../env";
import { Nautico } from "../../../models";

const TABLE_NAME = `tournament_boat`;

export async function getBoatsFromTournament(
  tournament: Nautico.Tournament,
  _: unknown,
  env: Env,
): Promise<Array<Nautico.Tournament.Boat>> {
  const { id } = tournament;
  const { DB } = env;

  const query = `
    SELECT
        *
    FROM
        ${TABLE_NAME}
    WHERE
        tournament_id = ?;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(toBoat);
}

export async function getBoatFromEntry(
  entry: Nautico.Tournament.Entry,
  _: unknown,
  env: Env,
): Promise<Nautico.Tournament.Boat | null> {
  const { id } = entry;
  const { DB } = env;

  const query = `
    SELECT
        tb.*
    FROM
        tournament_entry te
        LEFT JOIN ${TABLE_NAME} tb ON (te.tournament_boat_id = tb.id)
    WHERE
        te.id = ${id} AND tb.id IS NOT NULL;`;

  const { results } = await DB.prepare(query)
    // .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }

  return toBoat(results[0]);
}

/*MUTATION RESOLVERS */
export async function boatCreate(
  _: unknown,
  args: { tournamentId: number; input: BoatInput },
  env: Env,
): Promise<Nautico.Tournament.Boat> {
  const { tournamentId, input } = args;
  const { name } = input;
  const { DB } = env;

  if (!tournamentId) {
    throw new GraphQLError(
      `Cannot create a boat because required property 'tournamentId' is missing`,
    );
  }

  if (!name) {
    throw new GraphQLError(
      `Cannot create a boat because required property 'name' is missing`,
    );
  }

  const queryColumns = [`"name"`, "tournament_id"];

  const queryValues = [`'${name}'`, `${tournamentId}`];

  const query = `
    INSERT INTO ${TABLE_NAME}
      (${queryColumns.join(",")})
    VALUES
      (${queryValues.join(",")})
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    return toBoat(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

export async function boatUpdate(
  _: unknown,
  args: { input: BoatInput },
  env: Env,
): Promise<Nautico.Tournament.Boat> {
  const { input } = args;
  const { id, name } = input;
  const { DB } = env;

  if (!id) {
    throw new GraphQLError(
      `Cannot update a boat because required property 'id' is missing`,
    );
  }

  if (!name) {
    throw new GraphQLError(
      `Cannot update a boat because required property 'name' is missing`,
    );
  }

  const queryValues: Array<string> = [`"name" = '${name}'`];

  const query = `
    UPDATE ${TABLE_NAME} SET
      ${queryValues.join(", ")}
    WHERE
      id = ${id}
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    if (!results.length) {
      throw new Error(`Boat not found for the id: ${id}`);
    }
    return toBoat(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

interface BoatInput {
  id?: number;
  name?: string;
}

function toBoat(row: Record<string, unknown>): Nautico.Tournament.Boat {
  const { id, name, created_at } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    createdAt: new Date(`${created_at}`),
  };
}
