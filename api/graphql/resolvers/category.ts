import { GraphQLError } from "graphql";
import { Env } from "../../env";
import { Nautico } from "../../../models";
/* QUERY RESOLVERS */
export async function getCategories(
  tournament: Nautico.Tournament,
  _: unknown,
  env: Env,
): Promise<Array<Nautico.Tournament.Category>> {
  const { id } = tournament;
  const { DB } = env;

  const query = `
    SELECT
        *
    FROM
        tournament_category
    WHERE
        tournament_id = ?;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();

  return results.map(toCategory);
}

export async function getCategoryFromEntry(
  entry: Nautico.Tournament.Entry,
  _: unknown,
  env: Env,
): Promise<Nautico.Tournament.Category | null> {
  const { id } = entry;
  const { DB } = env;

  const query = `
  SELECT
      tc.*
  FROM
      tournament_entry te
      LEFT JOIN tournament_category tc ON (te.tournament_category_id = tc.id)
  WHERE
      te.id = ?
  LIMIT 1;`;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }

  return toCategory(results[0]);
}

/*MUTATION RESOLVERS */
export async function categoryCreate(
  _: unknown,
  args: { tournamentId: number; input: CategoryInput },
  env: Env,
): Promise<Nautico.Tournament.Category> {
  const { tournamentId, input } = args;
  const { name, type = "weight", limit = 1 } = input;
  const { DB } = env;
  if (!tournamentId) {
    throw new GraphQLError(
      `Cannot create a category because required property 'tournamentId' is missing`,
    );
  }

  if (!name) {
    throw new GraphQLError(
      `Cannot create a category because required property 'name' is missing`,
    );
  }

  const queryColumns = [
    `"name"`,
    "tournament_id",
    "category_type",
    `category_limit`,
  ];
  const queryValues = [`'${name}'`, `${tournamentId}`, `'${type}'`, `${limit}`];

  const query = `
    INSERT INTO tournament_category
      (${queryColumns.join(",")})
    VALUES
      (${queryValues.join(",")})
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    return toCategory(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

export async function categoryUpdate(
  _: unknown,
  args: { input: CategoryInput },
  env: Env,
): Promise<Nautico.Tournament.Category> {
  const { input } = args;
  const { id, name, type, limit } = input;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot update a category because required property 'id' is missing`,
    );
  }

  const queryValues: Array<string> = [];
  if (name) {
    queryValues.push(`"name" = '${name}'`);
  }

  if (name) {
    queryValues.push(`"category_type" = '${type}'`);
  }

  if (limit !== undefined) {
    queryValues.push(`"category_limit" = ${limit}`);
  }

  if (!queryValues.length) {
    throw new GraphQLError(
      `Cannot update a category because at least one property is required`,
    );
  }

  const query = `
    UPDATE tournament_category SET
      ${queryValues.join(", ")}
    WHERE
      id = ${id}
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    if (!results.length) {
      throw new Error(`Category not found for the id: ${id}`);
    }
    return toCategory(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

interface CategoryInput {
  id?: number;
  name?: string;
  type?: "points" | "weight";
  limit?: number;
}

export async function categoryDelete(
  _: unknown,
  args: { id: number },
  env: Env,
): Promise<number | null> {
  const { id } = args;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot delete a category because required property 'id' is missing`,
    );
  }

  const query = `
    DELETE FROM tournament_category WHERE id = ? RETURNING *;
  `;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }
  return id;
}

function toCategory(row: Record<string, unknown>): Nautico.Tournament.Category {
  const { id, name, category_type, category_limit, created_at } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    type: category_type as "points" | "weight",
    limit: parseInt(`${category_limit}`),
    createdAt: new Date(`${created_at}`),
  };
}
