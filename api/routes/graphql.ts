import hono from "hono";
import { graphqlServer } from "@hono/graphql-server";

import { schema } from "../graphql/schema";
import { rootResolver } from "../graphql/resolvers/index";

export function server(
  c: hono.Context<hono.Env, never, object>,
  next: hono.Next,
): Promise<Response | void> {
  const s = graphqlServer({
    schema,
    rootResolver,
    graphiql: true,
  });

  return s(c, next);
}
