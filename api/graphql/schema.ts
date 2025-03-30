export const typeDefs = `
  scalar Date

  enum OrderBy {
    position
    date
  }

  enum Direction {
    asc
    desc
  }

  type Sail {
    id: ID!
    boat: String!
    captain: String!
    crew: Int!
    destination: String!
    departure: Date!
    arrival: Date!
  }

  enum SailFilterBy {
    departure
    arrival
  }

  type Event {
    id: ID!
    name: String!
    position: Int!
    date: Date!
  }

  type Boat {
    id: ID!
    name: String!
  }

  type Fisherman {
    id: ID!
    name: String!
    email: String
    isEnabled: Boolean!
  }

  type Entry {
    id: ID!
    value: Float!
    date: Date!
    fisherman: Fisherman!
    category: Category!
    boat: Boat!
  }

  type Category {
    id: ID!
    name: String!
    type: CategoryType!
    limit: Int!
    position: Int!
    entries(ignoreLimit: Boolean): [Entry!]!
  }

  enum CategoryType {
    points
    weight
  }

  type Tournament {
    id: ID!
    name: String!
    slug: String!
    date: Date!
    position: Int!
    fishermans: [Fisherman!]!
    boats: [Boat!]!
    entries: [Entry!]!
    categories(orderBy: OrderBy, direction: Direction): [Category!]!
  }

  input TournamentInput {
    id: ID
    name: String
    slug: String
    position: Int
    date: Date
  }

  input CategoryInput {
    id: ID
    name: String
    type: CategoryType
    position: Int
    limit: Int
  }

  input FishermanInput {
    id: ID
    name: String
    email: String
    isEnabled: Boolean
  }

  input BoatInput {
    id: ID
    name: String
  }

  input EntryInput {
    id: ID
    value: Float
    date: Date
  }

  input SailInput {
    id: ID
    boat: String
    captain: String
    crew: Int
    destination: String
    departure: Date
    arrival: Date
  }

  type Query {
    event(id: ID!): Event
    events(orderBy: OrderBy, direction: Direction): [Event!]!
    tournament(id: ID, latest: Boolean): Tournament
    tournaments(orderBy: OrderBy, direction: Direction): [Tournament!]!
    sails(
      start: Date
      end: Date
      direction: Direction
      filterBy: SailFilterBy
    ): [Sail!]!
  }

  type Mutation {
    sailCreate(input: SailInput!): Sail!
    tournamentCreate(input: TournamentInput!): Tournament!
    tournamentUpdate(input: TournamentInput!): Tournament!
    tournamentDelete(id: ID!): ID
    categoryCreate(tournamentId: ID!, input: CategoryInput!): Category!
    categoryUpdate(input: CategoryInput!): Category!
    categoryDelete(id: ID!): ID
    fishermanCreate(tournamentId: ID!, input: FishermanInput!): Fisherman!
    fishermanUpdate(input: FishermanInput!): Fisherman!
    fishermanDelete(id: ID!): ID
    boatCreate(tournamentId: ID!, input: BoatInput!): Boat!
    boatUpdate(input: BoatInput!): Boat!
    boatDelete(id: ID!): ID
    entryCreate(
      tournamentId: ID!
      categoryId: ID!
      fishermanId: ID!
      boatId: ID!
      input: EntryInput!
    ): Entry!
    entryUpdate(input: EntryInput!): Entry!
    entryDelete(id: ID!): ID
  }
`;
