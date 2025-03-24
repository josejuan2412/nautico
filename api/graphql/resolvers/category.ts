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

function toCategory(row: Record<string, unknown>): Nautico.Tournament.Category {
  const { id, name, category_type, is_largest, created_at } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    type: category_type as "points" | "weight",
    isLargest: !!is_largest,
    createdAt: new Date(`${created_at}`),
  };
}
