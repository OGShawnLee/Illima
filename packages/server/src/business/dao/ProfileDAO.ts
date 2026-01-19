import ErrorHandler from "@business/ErrorHandler";
import mySQL from "@db";
import { ProfileSchema } from "shared";
import { InvalidRequestException } from "@business/Exception";

export namespace ProfileDAO {
  export function getOne(idAuthor: number) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM Profile WHERE id_author = ${idAuthor}`;

      if (result.length === 0) {
        throw new InvalidRequestException("Cannot get Profile because it doesn't exist.");
      }

      return ProfileSchema.getValidProfile(result[0]);
    });
  }
}
