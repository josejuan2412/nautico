import { createYoga } from "graphql-yoga";

import { schema } from "../graphql/resolvers";

export const yoga = createYoga({
  graphiql: true,
  cors: {
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
    exposedHeaders: ["Content-Length"],
    credentials: true,
  },
  graphqlEndpoint: "/api/graphql",
  schema,
});
