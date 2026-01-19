import type { InferOutput } from "valibot";
import { minValue, number, object, parse, pipe } from "valibot";

export namespace AuthSchema {
  export const MIN_ID_AUTHOR_VALUE = 1;
  const JWT_PAYLOAD_SCHEMA = object({
    idAuthor: pipe(
      number("ID Author must be a number."),
      minValue(MIN_ID_AUTHOR_VALUE, "ID Author must be greater than 0."),
    ),
    exp: pipe(
      number("Expiration must be a number."),
      minValue(new Date().getTime(), "Expiration must be a future timestamp."),
    ),
  });

  export type JWTPayloadShape = InferOutput<typeof JWT_PAYLOAD_SCHEMA>;

  export function getValidJWTPayloadShape(data: unknown) {
    return parse(JWT_PAYLOAD_SCHEMA, data);
  }
}
