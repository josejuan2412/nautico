import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getEvents, getEventById } from "./event";
import { getGroups } from "./group";
import { getPictures } from "./picture";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      events: getEvents,
      event: getEventById,
    },
    Event: {
      groups: getGroups,
    },
    Group: {
      pictures: getPictures,
    },
  },
});
