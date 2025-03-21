import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { type RootResolver, graphqlServer } from "@hono/graphql-server";
import { buildSchema } from "graphql";

export const app = new Hono();

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const rootResolver: RootResolver = () => {
  return {
    hello: () => {
      return "hello";
    },
  };
};

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/api/graphql",
  graphqlServer({
    schema,
    rootResolver,
    graphiql: true, // if `true`, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
  }),
);

app.fire();
// connect hono app with cloudflare pages request handler
export const onRequest = handle(app);
