import { buildSchema } from "graphql";
export const schema = buildSchema(`
  scalar Date
  type Event {
    # Event identifier
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
    hello: String
    events(orderBy: OrderBy, direction: Direction): [Event!]!
  }
`);
