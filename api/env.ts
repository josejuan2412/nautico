import { D1Database, R2Bucket } from "@cloudflare/workers-types";
export interface Env extends Record<string, unknown> {
  DB: D1Database;
  BUCKET: R2Bucket;
  BUCKET_DOMAIN: "https://assets.nauticocaribe.com";
}
