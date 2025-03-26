import { GraphQLError } from "graphql";
import { Env } from "../../env";
import { Nautico } from "../../../models";

export const ENTRY_TABLE_NAME = `tournament_entry`;

export async function getEntriesFromTournament(
  tournament: Nautico.Tournament,
  _: unknown,
  env: Env,
): Promise<Array<Nautico.Tournament.Entry>> {
  const { id } = tournament;
  const { DB } = env;

  const query = `
    SELECT
        te.*
    FROM
        ${ENTRY_TABLE_NAME} te
        LEFT JOIN tournament_fisherman tf
          ON (tf.id = te.tournament_fisherman_id)
    WHERE
        te.tournament_id = ?
        AND tf.is_enabled = TRUE
    ORDER BY
        "value" DESC,
        created_at ASC;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(toEntry);
}

export async function getEntriesFromCategory(
  category: Nautico.Tournament.Category,
  args: EntriesFromCategoryArgs,
  env: Env,
): Promise<Array<Nautico.Tournament.Entry>> {
  const { id, type, limit } = category;
  const { ignoreLimit } = args;
  const { DB } = env;

  let query = `
    SELECT
      te.*
    FROM
      ${ENTRY_TABLE_NAME} te
      LEFT JOIN tournament_fisherman tf
        ON (tf.id = te.tournament_fisherman_id)
    WHERE
      te.tournament_category_id = ?
      AND tf.is_enabled = TRUE
    ORDER BY
      "value" DESC,
      created_at ASC`;

  if (type === "points") {
    query = `
      SELECT
        te.*,
        SUM(te.value) as total
      FROM
        ${ENTRY_TABLE_NAME} te
        LEFT JOIN tournament_fisherman tf
          ON (tf.id = te.tournament_fisherman_id)
      WHERE
        tournament_category_id = ?
        AND tf.is_enabled = TRUE
      GROUP BY
        tournament_fisherman_id
      ORDER BY
        "total" DESC,
        created_at ASC`;
  }

  if (!ignoreLimit) {
    query += `\n LIMIT ${limit};`;
  }

  let { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  if (!results.length) {
    return [];
  }

  if (type === "points") {
    results = results.map((r) => {
      r.value = r.total;
      delete r.total;
      return r;
    });
  }

  const entries = results.map(toEntry);

  return entries;
}

interface EntriesFromCategoryArgs {
  ignoreLimit: boolean;
}

/*MUTATION RESOLVERS */

export async function entryCreate(
  _: unknown,
  args: {
    tournamentId: number;
    categoryId: number;
    fishermanId: number;
    boatId: number;
    input: EntryInput;
  },
  env: Env,
): Promise<Nautico.Tournament.Entry> {
  const { tournamentId, categoryId, fishermanId, boatId, input } = args;
  const { value, date } = input;
  const { DB } = env;
  if (!value) {
    throw new GraphQLError(
      `Cannot create an entry because required property 'value' is missing`,
    );
  }

  const category = await DB.prepare(
    `SELECT * FROM tournament_category
    WHERE id = ?;`,
  )
    .bind(parseInt(`${categoryId}`))
    .all();

  if (!category.results) {
    throw new GraphQLError(
      `Can't create an entry because the category doesn't exist`,
    );
  }

  if (`${category.results[0]["tournament_id"]}` !== `${tournamentId}`) {
    throw new GraphQLError(
      `Can't create an entry because the tournament in the category do not
      match the target tournament`,
    );
  }

  const fisherman = await DB.prepare(
    `SELECT * FROM tournament_fisherman
    WHERE id = ?;`,
  )
    .bind(parseInt(`${fishermanId}`))
    .all();

  if (!fisherman.results) {
    throw new GraphQLError(
      `Can't create an entry because the fisherman doesn't exist`,
    );
  }

  if (`${fisherman.results[0]["tournament_id"]}` !== `${tournamentId}`) {
    throw new GraphQLError(
      `Can't create an entry because the tournament for the fisherman do not
      match the target tournament`,
    );
  }

  const boat = await DB.prepare(
    `SELECT * FROM tournament_boat
    WHERE id = ?;`,
  )
    .bind(parseInt(`${boatId}`))
    .all();

  if (!boat.results) {
    throw new GraphQLError(
      `Can't create an entry because the boat doesn't exist`,
    );
  }

  if (`${boat.results[0]["tournament_id"]}` !== `${tournamentId}`) {
    throw new GraphQLError(
      `Can't create an entry because the tournament for the boat do not
      match the target tournament`,
    );
  }

  const queryColumns = [
    "tournament_id",
    "tournament_category_id",
    "tournament_fisherman_id",
    "tournament_boat_id",
    "value",
  ];
  const queryValues: Array<number | string | Date> = [
    tournamentId,
    categoryId,
    fishermanId,
    boatId,
    value,
  ];
  if (date) {
    queryColumns.push(`"created_at"`);
    queryValues.push(`datetime('${date.toString()}')`);
  }

  const query = `
    INSERT INTO ${ENTRY_TABLE_NAME}
      (${queryColumns.join(",")})
    VALUES
      (${queryValues.join(",")})
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    return toEntry(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

export async function entryUpdate(
  _: unknown,
  args: { input: EntryInput },
  env: Env,
): Promise<Nautico.Tournament.Entry> {
  const { input } = args;
  const { id, value, date } = input;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot update a entry because required property 'id' is missing`,
    );
  }

  const queryValues: Array<string> = [];
  if (value) {
    queryValues.push(`"value" = ${value}`);
  }
  if (date) {
    queryValues.push(`"created_at" = datetime('${date.toString()}')`);
  }
  if (!queryValues.length) {
    throw new GraphQLError(
      `Cannot update the entry because at least one property is required`,
    );
  }
  const query = `
    UPDATE ${ENTRY_TABLE_NAME} SET
      ${queryValues.join(", ")}
    WHERE
      id = ${id}
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    if (!results.length) {
      throw new Error(`Entry not found for the id: ${id}`);
    }
    return toEntry(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

interface EntryInput {
  id?: number;
  value?: number;
  date?: Date;
}

export async function entryDelete(
  _: unknown,
  args: { id: number },
  env: Env,
): Promise<number | null> {
  const { id } = args;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot delete a entry because required property 'id' is missing`,
    );
  }

  const query = `
    DELETE FROM  ${ENTRY_TABLE_NAME} WHERE id = ? RETURNING *;
  `;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }
  return id;
}

function toEntry(row: Record<string, unknown>): Nautico.Tournament.Entry {
  const { id, value, created_at } = row;
  return {
    id: parseInt(`${id}`),
    value: parseFloat(`${value}`),
    date: new Date(`${created_at}`),
  };
}
