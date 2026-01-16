import BusinessRuleException from "@business/BusinessRuleException";
import ErrorHandler from "@business/ErrorHandler";
import { AuthorDAO } from "@business/dao/AuthorDAO";
import { AuthorSchema } from "shared";

export namespace AuthorService {
  export function createOne(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      const author = AuthorSchema.getValidInsertAuthor(data);
      const duplicateAuthor = await AuthorDAO.findOneByDisplayName(author.display_name);

      if (duplicateAuthor.error) throw duplicateAuthor.error;

      if (duplicateAuthor.data) {
        throw new BusinessRuleException(
          "Cannot create Author because an Author with this display name already exists."
        );
      }

      return AuthorDAO.createOne(author).then((res) => {
        if (res.error) throw res.error;
      });
    });
  }
}
