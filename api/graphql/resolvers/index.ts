import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getEvents, getEventById } from "./event";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      events: getEvents,
      event: getEventById,
    },
  },
});
