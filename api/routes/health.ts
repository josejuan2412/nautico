import { Hono } from "hono";

const app = new Hono();

app.get(`/`, async (c) => {
  return c.json({
    ok: true,
  });
});

export default app;
