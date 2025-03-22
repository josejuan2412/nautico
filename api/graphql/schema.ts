import { buildSchema } from "graphql";
export const schema = buildSchema(`
  scalar Date
  type Group {
    id: ID!
    name: String!
    directory: String!
    position: Int!
    date: Date!
  }
  type Event {
    id: ID!
    name: String!
    position: Int!
    date: Date!
    groups: [Group!]
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
`);
