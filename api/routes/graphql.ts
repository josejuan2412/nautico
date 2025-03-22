import { createYoga } from "graphql-yoga";

import { schema } from "../graphql/resolvers";

export const yoga = createYoga({
  graphiql: true,
  schema,
});
