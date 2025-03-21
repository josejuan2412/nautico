import { Context, Env, Next } from "hono";
import { env } from "hono/adapter";
import { graphqlServer } from "@hono/graphql-server";

import { schema } from "../graphql/schema";
import { rootResolver } from "../graphql/resolvers/index";
import { AppEnv } from "../env";

// import { BlankEnv } from "hono/types";

export function server(
  c: Context<Env, never, object>,
  next: Next,
): Promise<Response | void> {
  const appEnv = env<AppEnv>(c);

  const s = graphqlServer({
    schema,
    rootResolver: rootResolver(appEnv),
    graphiql: true,
  });

  return s(c, next);
}
