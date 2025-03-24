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
    isEnabled: Boolean!
  }

  type Entry {
    id: ID!
    value: Int!
    date: Date!
    fisherman: Fisherman
    boat: Boat
  }

  type Tournament {
    id: ID!
    name: String!
    slug: String!
    date: Date!
    fishermans: [Fisherman!]!
    boats: [Boat!]!
    entries: [Entry!]!
  }

  type Query {
    event(id: ID!): Event
    events(orderBy: OrderBy, direction: Direction): [Event!]!
  }
`;
