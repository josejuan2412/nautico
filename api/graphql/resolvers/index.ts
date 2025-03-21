import { type RootResolver } from "@hono/graphql-server";

import { hello } from "./hello";
import { getEvents } from "./events";

export const rootResolver: RootResolver = () => {
  return {
    hello,
    events: getEvents,
  };
};
