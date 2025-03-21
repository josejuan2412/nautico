import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/cloudflare-pages";
import { D1Database } from "@cloudflare/workers-types";

import { server } from "../../resolvers";

export const app = new Hono();

app.get("/api", async (c) => {
  const { DB } = env<{ DB: D1Database }>(c);
  const { results } = await DB.prepare("SELECT * FROM example").all();
  return c.json(results);
});

app.use("/api/graphql", server);

app.fire();
// connect hono app with cloudflare pages request handler
export const onRequest = handle(app);
