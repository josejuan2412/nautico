import { D1Database } from "@cloudflare/workers-types";
export interface AppEnv extends Record<string, unknown> {
  DB: D1Database;
}
