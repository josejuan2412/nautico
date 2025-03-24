import { Env } from "../../env";
import { Nautico } from "../../../models";
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
