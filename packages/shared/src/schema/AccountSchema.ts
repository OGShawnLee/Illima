import AuthorSchema from "./AuthorSchema";
import * as v from "valibot";

export namespace AccountSchema {
  export const MIN_PASSWORD_LENGTH = 8;
  export const MAX_PASSWORD_LENGTH = 64;
  export const MIN_DISPLAY_NAME_LENGTH = AuthorSchema.MIN_DISPLAY_NAME_LENGTH;
  export const MAX_DISPLAY_NAME_LENGTH = AuthorSchema.MAX_DISPLAY_NAME_LENGTH;
  export const MIN_EMAIL_LENGTH = 6;
  export const MAX_EMAIL_LENGTH = 128;
  export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
  export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const SIMPLE_PASSWORD_SCHEMA = v.pipe(
    v.string("Password must be a string"),
    v.minLength(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters long."),
    v.maxLength(MAX_PASSWORD_LENGTH, "Password must be at most 64 characters long."),
  );
  const STRONG_PASSWORD_SCHEMA = v.pipe(
    SIMPLE_PASSWORD_SCHEMA,
    v.regex(
      PASSWORD_REGEX,
      "Password must contain at least one letter, digit, uppercase and lowercase characters.",
    ),
  );

  const ACCOUNT_SCHEMA = v.object({
    id_account: v.number(),
    id_author: v.number(),
    email: v.pipe(
      v.string("Email must be a string"),
      v.minLength(MIN_EMAIL_LENGTH, "Email must be at least 6 characters long."),
      v.maxLength(MAX_EMAIL_LENGTH, "Email must be at most 128 characters long."),
      v.regex(EMAIL_REGEX, "Email have the correct format."),
    ),
    password: SIMPLE_PASSWORD_SCHEMA,
    created_at: v.date(),
  });
  const SIGN_UP_SCHEMA = v.object({
    name: AuthorSchema.AUTHOR_SCHEMA.entries.name,
    last_name: AuthorSchema.AUTHOR_SCHEMA.entries.last_name,
    display_name: AuthorSchema.AUTHOR_SCHEMA.entries.display_name,
    email: ACCOUNT_SCHEMA.entries.email,
    password: STRONG_PASSWORD_SCHEMA,
  });
  const SIGN_IN_SCHEMA = v.object({
    display_name: AuthorSchema.AUTHOR_SCHEMA.entries.display_name,
    password: STRONG_PASSWORD_SCHEMA,
  });
  const INSERT_ACCOUNT_SCHEMA = v.object({
    id_author: v.number(),
    email: SIGN_UP_SCHEMA.entries.email,
    password: SIMPLE_PASSWORD_SCHEMA,
  });

  export type SignUpShape = v.InferOutput<typeof SIGN_UP_SCHEMA>;
  export type InsertAccountShape = v.InferOutput<typeof INSERT_ACCOUNT_SCHEMA>;

  export function getValidSignUpShape(data: unknown) {
    return v.parse(SIGN_UP_SCHEMA, data);
  }

  export function getValidSignInShape(data: unknown) {
    return v.parse(SIGN_IN_SCHEMA, data);
  }

  export function getValidInsertAccount(data: unknown) {
    return v.parse(INSERT_ACCOUNT_SCHEMA, data);
  }

  export function getValidAccount(data: unknown) {
    return v.parse(ACCOUNT_SCHEMA, data);
  }
}
