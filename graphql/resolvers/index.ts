import { type RootResolver } from "@hono/graphql-server";

import { hello } from "./hello";

export const rootResolver: RootResolver = () => {
  return {
    hello,
  };
};
