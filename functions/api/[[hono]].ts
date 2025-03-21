import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/cloudflare-pages";

import { Env } from "../../api/env";

import { server } from "../../api/routes/graphql";
import healthRoute from "../../api/routes/health";

const basename = "/api";

export const app = new Hono();

app.get(basename, async (c) => {
  const { DB } = env<Env>(c);

  const { results } = await DB.prepare(
    "SELECT id, name, position, date(date) as date FROM event ORDER BY position ASC",
  ).all();
  return c.json(
    results.map((r) => {
      r.date = new Date(`${r.date}`);
      return r;
    }),
  );
});

app.route(`${basename}/health`, healthRoute);
app.use(`${basename}/graphql`, async (c, next) => {
  return await server(c, next);
});
//app.use(`${basename}/graphql`, graphqlRoute());

app.fire();
// connect hono app with cloudflare pages request handler
export const onRequest = handle(app);
