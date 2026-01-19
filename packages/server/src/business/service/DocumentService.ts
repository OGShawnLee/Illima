import ErrorHandler from "@business/ErrorHandler";
import { AuthorDAO } from "@business/dao/AuthorDAO";
import { BusinessRuleException } from "@business/Exception";
import { DocumentDAO } from "@business/dao/DocumentDAO";
import { DocumentSchema } from "shared";

export namespace DocumentService {
  export function createOne(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      const document = DocumentSchema.getValidInsertDocument(data);
      const author = await AuthorDAO.findOne(document.id_author);

      if (author.error) throw author.error;

      if (author.data) {
        return DocumentDAO.createOne(document).then((res) => {
          if (res.error) throw res.error;
        });
      }

      throw new BusinessRuleException(
        "Cannot create Document because the provided Author doesn't exists.",
      );
    });
  }
}
