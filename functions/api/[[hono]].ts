import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/cloudflare-pages";

import { Env } from "../../api/env";

import { server } from "../../api/routes/graphql";
import healthRoute from "../../api/routes/health";

const basename = "/api";

export const app = new Hono();

app.get(basename, async (c) => {
  const { BUCKET } = env<Env>(c);

  const objects = await BUCKET.list({
    prefix: "january-2025/",
  });

  console.log(`OBJECTS: `, objects);

  return c.json(objects);
});

app.route(`${basename}/health`, healthRoute);
app.use(`${basename}/graphql`, async (c, next) => {
  return await server(c, next);
});
//app.use(`${basename}/graphql`, graphqlRoute());

app.fire();
// connect hono app with cloudflare pages request handler
export const onRequest = handle(app);
