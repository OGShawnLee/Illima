import ErrorHandler from "@business/ErrorHandler";
import InvalidRequestException from "@business/InvalidRequestException";
import mySQL from "@db";
import { DocumentSchema } from "shared";

export namespace DocumentDAO {
  export async function createOne(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      await mySQL`INSERT INTO Document ${mySQL(DocumentSchema.getValidInsertDocument(data))}`;
    });
  }

  export async function findOne(id: string) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM CompleteDocumentView WHERE id_document = ${id}`;

      if (result.length === 0) {
        return undefined;
      }

      return DocumentSchema.getValidDocument(result[0]);
    });
  }

  export async function getAll() {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM CompleteDocumentView`;
      return result.map(DocumentSchema.getValidDocument) as DocumentSchema.DocumentShape[];
    });
  }

  export async function getOne(id: string) {
    return ErrorHandler.useAwait(async () => {
      const { data, error } = await findOne(id);

      if (data) return data;

      if (error) throw error;

      throw new InvalidRequestException("Cannot get Document because it doesn't exist.");
    });
  }

  export async function deleteOne(id: string) {
    return ErrorHandler.useAwait(async () => {
      await mySQL`DELETE FROM Document WHERE id_document = ${id}`;
    });
  }
}
