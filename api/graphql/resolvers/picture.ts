import type { R2Object } from "@cloudflare/workers-types/experimental";
import { Picture } from "../../../models/Picture";
import { Group } from "../../../models/Group";
import { Env } from "../../env";

export async function getPictures(
  group: Group,
  _: unknown,
  env: Env,
): Promise<Array<Picture>> {
  const { directory } = group;
  const { BUCKET, BUCKET_DOMAIN } = env;

  if (!directory) {
    return [];
  }

  const { objects } = await BUCKET.list({
    prefix: directory,
  });

  return objects.map(mapToPicture(BUCKET_DOMAIN));
}

function mapToPicture(bucketDomain: string) {
  return (object: R2Object): Picture => {
    const { etag, key, version, size, uploaded } = object;
    return {
      id: etag,
      key,
      url: `${bucketDomain}/${key}`,
      version,
      size,
      uploaded,
    };
  };
}
