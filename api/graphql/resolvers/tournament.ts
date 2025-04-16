import { GraphQLError } from "graphql";
import { Env } from "../../env";
import { Nautico } from "../../../models";

export const TOURNAMENT_TABLE_NAME = `tournament`;

type Tournament = Nautico.Tournament;

/* QUERY RESOLVERS */
export async function getTournaments(
  _: unknown,
  args: GetTournamentsArgs,
  env: Env,
): Promise<Array<Tournament>> {
  const { orderBy = "position", direction = "asc" } = args;
  const { DB } = env;

  const query = `SELECT * FROM ${TOURNAMENT_TABLE_NAME}
    ORDER BY ${orderBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(toTournament);
}

interface GetTournamentsArgs {
  orderBy?: "position" | "date";
  direction?: "asc" | "desc";
}

export async function getTournament(
  _: unknown,
  args: GetTournamentArgs,
  env: Env,
): Promise<Tournament | null> {
  const { id, latest } = args;
  const { DB } = env;

  if (!latest && id === undefined) {
    throw new Error("You must specify an id");
  }

  let query = `SELECT * FROM ${TOURNAMENT_TABLE_NAME}
    WHERE id = ${id} LIMIT 1;`;
  if (latest) {
    query = `SELECT * FROM ${TOURNAMENT_TABLE_NAME}
      WHERE is_enabled = 1
      ORDER BY "date" DESC LIMIT 1;`;
  }

  const { results } = await DB.prepare(query).all();

  if (!results.length) {
    return null;
  }

  return results.map(toTournament)[0];
}

interface GetTournamentArgs {
  id: number;
  latest: boolean;
}

/* MUTATION RESOLVERS */
export async function tournamentCreate(
  _: unknown,
  args: { input: TournamentInput },
  env: Env,
): Promise<Tournament> {
  const { input } = args;
  const { name, slug, position, date, isEnabled = true } = input;
  const { DB } = env;
  if (!name) {
    throw new GraphQLError(
      `Cannot create a tournament because required property 'name' is missing`,
    );
  }

  if (!slug) {
    throw new GraphQLError(
      `Cannot create a tournament because required property 'slug' is missing`,
    );
  }

  if (isNumeric(`${slug}`)) {
    throw new GraphQLError(
      `Cannot create a tournament because the property 'slug' can't be numeric`,
    );
  }

  const queryColumns = [`"name"`, "slug", "is_enabled"];
  const queryValues: Array<string | number> = [
    `'${name}'`,
    `'${slug}'`,
    `${isEnabled ? "1" : "0"}`,
  ];

  if (position !== undefined) {
    queryColumns.push(`"position"`);
    queryValues.push(position);
  }

  if (date) {
    queryColumns.push(`"date"`);
    queryValues.push(`datetime('${date.toString()}')`);
  }

  const query = `
    INSERT INTO ${TOURNAMENT_TABLE_NAME}
      (${queryColumns.join(",")})
    VALUES
      (${queryValues.join(",")})
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    return toTournament(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

export async function tournamentUpdate(
  _: unknown,
  args: { input: TournamentInput },
  env: Env,
): Promise<Tournament> {
  const { input } = args;
  const { id, name, slug, position, date, isEnabled } = input;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot update a tournament because required property 'id' is missing`,
    );
  }

  const queryValues: Array<string> = [];
  if (name) {
    queryValues.push(`"name" = '${name}'`);
  }

  if (slug) {
    if (isNumeric(`${slug}`)) {
      throw new GraphQLError(
        `Cannot update a tournament because the property 'slug' can't be numeric`,
      );
    }

    queryValues.push(`slug = '${slug}'`);
  }

  if (position !== undefined) {
    queryValues.push(`"position" = ${position}`);
  }

  if (isEnabled !== undefined) {
    queryValues.push(`"is_enabled" = ${isEnabled ? "1" : "0"}`);
  }

  if (date) {
    queryValues.push(`"date" = datetime('${date.toString()}')`);
  }

  if (!queryValues.length) {
    throw new GraphQLError(
      `Cannot update the tournament because at least one property is required`,
    );
  }

  const query = `
    UPDATE ${TOURNAMENT_TABLE_NAME} SET
      ${queryValues.join(", ")}
    WHERE
      id = ${id}
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    if (!results.length) {
      throw new Error(`Tournament not found for the id: ${id}`);
    }
    return toTournament(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

interface TournamentInput {
  id?: number;
  name?: string;
  slug?: string;
  position?: number;
  isEnabled?: boolean;
  date?: Date;
}

export async function tournamentDelete(
  _: unknown,
  args: { id: number },
  env: Env,
): Promise<number | null> {
  const { id } = args;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot delete a tournament because required property 'id' is missing`,
    );
  }

  const query = `
    DELETE FROM ${TOURNAMENT_TABLE_NAME} WHERE id = ? RETURNING *;
  `;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }
  return id;
}

function toTournament(row: Record<string, unknown>): Tournament {
  const { id, name, slug, position, date, created_at, is_enabled } = row;
  return {
    id: parseInt(`${id}`),
    name: `${name || ""}`,
    slug: `${slug || ""}`,
    position: parseInt(`${position}`),
    isEnabled: parseInt(`${is_enabled}`) ? true : false,
    date: new Date(`${date}`),
    createdAt: new Date(`${created_at}`),
  };
}

function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}
