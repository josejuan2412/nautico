import { AppEnv } from "../../env";

export function hello(env: AppEnv): string {
  console.log(env);
  return "world";
}
