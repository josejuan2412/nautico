import { GraphQLError } from "graphql";
import { Nautico } from "../../../models";
import { Env } from "../../env";

export const SAIL_TABLE_NAME = `tournament`;

/*MUTATION Resolvers*/
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

interface SailInput {
  id?: number;
  boat?: string;
  captain?: string;
  crew?: number;
  destination?: Date;
  departure?: Date;
  arrival?: Date;
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
