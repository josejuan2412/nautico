import { type RootResolver, graphqlServer } from "@hono/graphql-server";
import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Query {
  hello: String
}
`);

const rootResolver: RootResolver = () => {
  return {
    hello: () => {
      return "hello world";
    },
  };
};

export const server = graphqlServer({
  schema,
  rootResolver,
  graphiql: true, // if `true`, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
});
