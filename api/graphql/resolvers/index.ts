import { type RootResolver } from "@hono/graphql-server";

import { hello } from "./hello";
import { AppEnv } from "../../env";

export function rootResolver(env: AppEnv): RootResolver {
  const resolver: RootResolver = () => {
    return {
      hello: hello(env),
    };
  };
  return resolver;
}
