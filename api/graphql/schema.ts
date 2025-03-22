export const typeDefs = `
  scalar Date
  type Picture {
    id: ID!
    key: String!
    url: String!
    version: String!
    size: Int!
    uploaded: Date!
  }
  type Group {
    id: ID!
    name: String!
    directory: String!
    position: Int!
    date: Date!
    pictures: [Picture!]
  }
  type Event {
    id: ID!
    name: String!
    position: Int!
    date: Date!
    groups(orderBy: OrderBy, direction: Direction): [Group!]
  }
  enum OrderBy {
    position
    date
  }
  enum Direction {
    asc
    desc
  }
  type Query {
    event(id: ID!): Event
    events(orderBy: OrderBy, direction: Direction): [Event!]!
  }
`;
