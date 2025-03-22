import { type RootResolver } from "@hono/graphql-server";

import { getEvents, getEventById } from "./event";

export const rootResolver: RootResolver = () => {
  return {
    events: getEvents,
    event: getEventById,
  };
};
