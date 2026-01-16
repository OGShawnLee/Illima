import ErrorHandler from "@business/ErrorHandler";
import InvalidRequestException from "@business/InvalidRequestException";
import mySQL from "@db";
import { AuthorSchema } from "shared";

export namespace AuthorDAO {
  export async function createOne(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      await mySQL`INSERT INTO Author ${mySQL(AuthorSchema.getValidInsertAuthor(data))}`;
    });
  }

  export async function findOne(id: string | number) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM Author WHERE id_author = ${id}`;

      if (result.length === 0) {
        return undefined;
      }

      return AuthorSchema.getValidAuthor(result[0]);
    });
  }

  export async function findOneByDisplayName(displayName: string) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM Author WHERE display_name = ${displayName}`;

      if (result.length === 0) {
        return undefined;
      }

      return AuthorSchema.getValidAuthor(result[0]);
    });
  }

  export async function getAll() {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM Author`;
      return result.map(AuthorSchema.getValidAuthor) as AuthorSchema.AuthorShape[];
    });
  }

  export async function getOneByDisplayName(displayName: string) {
    return ErrorHandler.useAwait(async () => {
      const { data, error } = await findOneByDisplayName(displayName);

      if (data) return data;

      if (error) throw error;

      throw new InvalidRequestException("Cannot get Author because it doesn't exist.");
    });
  }

  export async function deleteOneByDisplayName(displayName: string) {
    return ErrorHandler.useAwait(async () => {
      await mySQL`DELETE FROM Author WHERE display_name = ${displayName}`;
    });
  }
}
