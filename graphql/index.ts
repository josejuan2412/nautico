import { graphqlServer } from "@hono/graphql-server";

import { schema } from "./schema";
import { rootResolver } from "./resolvers";

export const server = graphqlServer({
  schema,
  rootResolver,
  graphiql: true,
});
