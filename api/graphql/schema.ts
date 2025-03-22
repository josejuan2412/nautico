import { buildSchema } from "graphql";
export const schema = buildSchema(`
  scalar Date
  type Event {
    id: ID!
    name: String!
    position: Int!
    date: Date!
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
