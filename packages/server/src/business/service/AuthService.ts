import BusinessRuleException from "@business/BusinessRuleException";
import ErrorHandler from "@business/ErrorHandler";
import Utility from "@business/Utility";
import mySQL from "@db";
import { AccountDAO } from "@business/dao/AccountDAO";
import { AuthorDAO } from "@business/dao/AuthorDAO";
import { AccountSchema, AuthorSchema } from "shared";
import { sign } from "hono/jwt";

export namespace AuthService {
  export function handleSignUp(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      const credentials = AccountSchema.getValidSignUpShape(data);
      const [duplicateAccountByDisplayName, duplicateAccountByEmail] = await Promise.all([
        AccountDAO.findOneByDisplayName(credentials.display_name),
        AccountDAO.findOneByEmail(credentials.email),
      ]);

      if (duplicateAccountByDisplayName.error) {
        throw duplicateAccountByDisplayName.error;
      }

      if (duplicateAccountByEmail.error) {
        throw duplicateAccountByEmail.error;
      }

      if (duplicateAccountByDisplayName.data) {
        throw new BusinessRuleException(
          "Cannot create Account because the display name is already in use.",
        );
      }

      if (duplicateAccountByEmail.data) {
        throw new BusinessRuleException(
          "Cannot create Account because the email is already in use.",
        );
      }

      const author = await mySQL.begin(async (transaction) => {
        await AuthorDAO.createOne(transaction, credentials);
        const author = await AuthorDAO.getOneByDisplayName(credentials.display_name, transaction);

        if (author.error) throw author.error;

        const account: AccountSchema.InsertAccountShape = {
          id_author: author.data.id_author,
          email: credentials.email,
          password: await Bun.password.hash(credentials.password, "bcrypt"),
        };

        await AccountDAO.createOne(transaction, account);

        return author.data;
      });

      return createJWTToken(author);
    });
  }

  async function createJWTToken(
    author: Pick<AuthorSchema.AuthorShape, "id_author" | "display_name">,
  ) {
    return sign(
      {
        id_author: author.id_author,
        display_name: author.display_name,
        exp: Utility.calculateFutureTimestamp(15, "minutes"),
      },
      process.env.ACCESS_TOKEN!,
    );
  }
}
