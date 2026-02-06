import * as v from "valibot";
import AuthorSchema from "./AuthorSchema";
import { AccountSchema } from "./AccountSchema";
import { getDateOrStringSchema } from "./Common";

export namespace ProfileSchema {
  const PROFILE_SCHEMA = v.object({
    id_author: v.number(),
    name: AuthorSchema.AUTHOR_SCHEMA.entries.name,
    last_name: AuthorSchema.AUTHOR_SCHEMA.entries.last_name,
    display_name: AuthorSchema.AUTHOR_SCHEMA.entries.display_name,
    email: AccountSchema.ACCOUNT_SCHEMA.entries.email,
    created_at: getDateOrStringSchema("Created At"),
  });

  export type ProfileShape = v.InferOutput<typeof PROFILE_SCHEMA>;

  export function getValidProfile(data: unknown) {
    return v.parse(PROFILE_SCHEMA, data);
  }
}
