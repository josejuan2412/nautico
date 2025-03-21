import { D1Database } from "@cloudflare/workers-types";
export interface Env extends Record<string, unknown> {
  DB: D1Database;
}
