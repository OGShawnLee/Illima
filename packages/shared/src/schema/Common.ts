import { date, number, pipe, string, transform, union } from "valibot";

export function getDateOrStringSchema(name: string) {
  return pipe(
    union([date(), string()], name + " must be a date or a string"),
    transform((input) => {
      return typeof input === "string" ? new Date(input) : input;
    }),
  );
}

export function getForeignKeySchema(name: string) {
  return pipe(
    union([string(), number()], name + " must be a string or a number"),
    transform((input) => {
      if (typeof input === "number") {
        return input;
      }

      const parsed = Number(input.trim());

      if (isNaN(parsed)) {
        throw name + " must be a valid number.";
      }

      return parsed;
    }),
  );
}
