import * as v from "valibot";

export namespace AuthorSchema {
  export const MIN_NAME_LENGTH = 2;
  export const MAX_NAME_LENGTH = 64;
  export const MIN_LAST_NAME_LENGTH = 2;
  export const MAX_LAST_NAME_LENGTH = 64;
  export const MIN_DISPLAY_NAME_LENGTH = 2;
  export const MAX_DISPLAY_NAME_LENGTH = 16;
  export const MAX_CONTENT_LENGTH = 65535;

  const INSERT_AUTHOR_SCHEMA = v.object({
    name: v.pipe(
      v.string("Name must be a string."),
      v.minLength(MIN_NAME_LENGTH, "Name must be at least 8 characters long."),
      v.maxLength(MAX_NAME_LENGTH, "Name must be at most 64 characters long."),
      v.trim()
    ),
    last_name: v.pipe(
      v.string("Last Name must be a string"),
      v.minLength(
        MIN_LAST_NAME_LENGTH,
        "Last Name must be at least 8 characters long."
      ),
      v.maxLength(
        MAX_LAST_NAME_LENGTH,
        "Last Name must be at most 64 characters long."
      ),
      v.trim()
    ),
    display_name: v.pipe(
      v.string("Display Name must be a string"),
      v.minLength(
        MIN_DISPLAY_NAME_LENGTH,
        "Display Name must be at least 8 characters long."
      ),
      v.maxLength(
        MAX_DISPLAY_NAME_LENGTH,
        "Display Name must be at most 64 characters long."
      ),
      v.trim()
    ),
  });
  const AUTHOR_SCHEMA = v.object({
    ...INSERT_AUTHOR_SCHEMA.entries,
    id_author: v.number(),
    created_at: v.date(),
  });

  export type InsertAuthorShape = v.InferOutput<typeof INSERT_AUTHOR_SCHEMA>;
  export type AuthorShape = v.InferOutput<typeof AUTHOR_SCHEMA>;

  export function getValidAuthor(data: unknown) {
    return v.parse(AUTHOR_SCHEMA, data);
  }

  export function getValidInsertAuthor(data: unknown) {
    return v.parse(INSERT_AUTHOR_SCHEMA, data);
  }
}

export default AuthorSchema;
