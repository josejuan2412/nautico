import { GraphQLError } from "graphql";
import { DateTime } from "luxon";
import { Nautico } from "../../../models";
import { Env } from "../../env";

export const SAIL_TABLE_NAME = `sail`;

/* QUERY RESOLVERS */
export async function getSails(
  _: unknown,
  args: GetSailsArgs,
  env: Env,
): Promise<Array<Nautico.Sail>> {
  const { direction = "desc", filterBy = "departure" } = args;
  const { DB } = env;

  console.log(`ARGS: `, args);
  console.log(`TYPE: `, typeof args.start);

  const start = args.start
    ? DateTime.fromJSDate(
        typeof args.start === "string" ? new Date(args.start) : args.start,
      )
    : DateTime.now().minus({ days: 7 });
  const end = args.end
    ? DateTime.fromJSDate(
        typeof args.end === "string" ? new Date(args.end) : args.end,
      )
    : DateTime.now();

  if (!start.isValid) {
    throw new GraphQLError(
      `The property 'start' with value "${args.start}" is invalid`,
    );
  }

  if (!end.isValid) {
    throw new GraphQLError(
      `The property 'end' with value (${args.end}) is invalid`,
    );
  }

  if (start >= end) {
    throw new GraphQLError(
      `The 'start' date (${start.toISO()}) can not be larger than the 'end' date (${end.toISO()})`,
    );
  }

  const startDate = start.toFormat("yyyy-LL-dd");
  const endDate = end.toFormat("yyyy-LL-dd");

  const query = `SELECT * FROM ${SAIL_TABLE_NAME}
    WHERE ${filterBy} BETWEEN '${startDate} 00:00:00'
      AND '${endDate} 23:59:59'
    ORDER BY ${filterBy} ${direction}`;

  const { results } = await DB.prepare(query).all();

  return results.map(toSail);
}

interface GetSailsArgs {
  start: Date | string;
  end: Date | string;
  direction: "asc" | "desc";
  filterBy: "departure" | "arrival";
}

/*MUTATION RESOLVERS*/
export async function sailCreate(
  _: unknown,
  args: { input: SailInput },
  env: Env,
): Promise<Nautico.Sail> {
  const { input } = args;
  const { boat, captain, crew, destination, departure, arrival } = input;
  const { DB } = env;

  if (!boat) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'boat' is missing`,
    );
  }

  if (!captain) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'captain' is missing`,
    );
  }

  if (!crew) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'crew' is missing`,
    );
  }

  if (!destination) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'destination' is missing`,
    );
  }

  if (!departure) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'departure' is missing`,
    );
  }

  if (!arrival) {
    throw new GraphQLError(
      `Cannot create a sail because required property 'arrival' is missing`,
    );
  }

  if (departure >= arrival) {
    throw new GraphQLError(
      `Cannot create a sail because arrival must be larger than departure`,
    );
  }

  const queryColumns = [
    `boat`,
    "captain",
    "crew",
    "destination",
    "departure",
    "arrival",
  ];
  const queryValues: Array<string | number> = [
    `'${boat}'`,
    `'${captain}'`,
    crew,
    `'${destination}'`,
    `datetime('${departure.toString()}')`,
    `datetime('${arrival.toString()}')`,
  ];

  const query = `
    INSERT INTO ${SAIL_TABLE_NAME}
      (${queryColumns.join(",")})
    VALUES
      (${queryValues.join(",")})
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    return toSail(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

export async function sailUpdate(
  _: unknown,
  args: { input: SailInput },
  env: Env,
): Promise<Nautico.Sail> {
  const { input } = args;
  const { id, boat, captain, crew, destination, departure, arrival } = input;
  const { DB } = env;

  if (!id) {
    throw new GraphQLError(
      `Cannot update a sail because required property 'id' is missing`,
    );
  }

  const queryValues: Array<string> = [];

  if (boat) {
    queryValues.push(`boat = '${boat}'`);
  }

  if (captain) {
    queryValues.push(`captain = '${captain}'`);
  }

  if (crew) {
    queryValues.push(`crew = ${crew}`);
  }

  if (destination) {
    queryValues.push(`destination = '${crew}'`);
  }

  if (departure && !arrival) {
    throw new GraphQLError(
      `Cannot update a sail 'departure' property without an 'arrival' property`,
    );
  }

  if (!departure && arrival) {
    throw new GraphQLError(
      `Cannot update a sail 'arrival' property without an 'departure' property`,
    );
  }

  if (departure && arrival) {
    const departureDt = DateTime.fromJSDate(
      typeof departure === "string" ? new Date(departure) : departure,
    );
    const arrivalDt = DateTime.fromJSDate(
      typeof arrival === "string" ? new Date(arrival) : arrival,
    );

    if (departureDt >= arrivalDt) {
      throw new GraphQLError(
        `Cannot create a sail because arrival must be larger than departure`,
      );
    }
    queryValues.push(
      `departure = datetime('${departureDt.toJSDate().toString()}')`,
    );
    queryValues.push(
      `arrival = datetime('${arrivalDt.toJSDate().toString()}')`,
    );
  }

  if (!queryValues.length) {
    throw new GraphQLError(
      `Cannot update the sail because at least one property is required`,
    );
  }

  const query = `
    UPDATE ${SAIL_TABLE_NAME} SET
      ${queryValues.join(", ")}
    WHERE
      id = ${id}
    RETURNING *;
  `;

  try {
    const { results } = await DB.prepare(query).all();
    if (!results.length) {
      throw new Error(`Sail not found for the id: ${id}`);
    }
    return toSail(results[0]);
  } catch (e) {
    throw new GraphQLError(e.message);
  }
}

interface SailInput {
  id: number;
  boat: string;
  captain: string;
  crew: number;
  destination: string;
  departure: Date;
  arrival: Date;
}

export async function sailDelete(
  _: unknown,
  args: { id: number },
  env: Env,
): Promise<number | null> {
  const { id } = args;
  const { DB } = env;
  if (!id) {
    throw new GraphQLError(
      `Cannot delete a sail because required property 'id' is missing`,
    );
  }

  const query = `
    DELETE FROM ${SAIL_TABLE_NAME} WHERE id = ? RETURNING *;
  `;

  const { results } = await DB.prepare(query)
    .bind(parseInt(`${id}`))
    .all();
  if (!results.length) {
    return null;
  }
  return id;
}

export function toSail(row: Record<string, unknown>): Nautico.Sail {
  const {
    id,
    boat,
    captain,
    crew,
    destination,
    departure,
    arrival,
    created_at,
  } = row;
  return {
    id: parseInt(`${id}`),
    boat: `${boat}`,
    captain: `${captain}`,
    crew: parseInt(`${crew}`),
    destination: `${destination}`,
    departure: new Date(`${departure}`),
    arrival: new Date(`${arrival}`),
    createdAt: new Date(`${created_at}`),
  };
}
