import { type RootResolver } from "@hono/graphql-server";

import { hello } from "./hello";
import { Env } from "../../env";

export function rootResolver(env: Env): RootResolver {
  console.log(env);
  const resolver: RootResolver = () => {
    return {
      hello,
    };
  };
  return resolver;
}
