import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/cloudflare-pages";

import { AppEnv } from "../../api/env";

import { server } from "../../api/routes/graphql";
import healthRoute from "../../api/routes/health";

const basename = "/api";

export const app = new Hono();

app.get(basename, async (c) => {
  const { DB } = env<AppEnv>(c);

  const { results } = await DB.prepare("SELECT * FROM example").all();
  return c.json(results);
});

app.route(`${basename}/health`, healthRoute);
app.use(`${basename}/graphql`, async (c, next) => {
  return await server(c, next);
});
//app.use(`${basename}/graphql`, graphqlRoute());

app.fire();
// connect hono app with cloudflare pages request handler
export const onRequest = handle(app);
