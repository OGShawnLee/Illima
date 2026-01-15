import { number, pipe, string, transform, union } from "valibot";

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
    })
  );
}
