import ErrorHandler from "@business/ErrorHandler";
import Utility from "@business/Utility";
import mySQL from "@db";
import { AccountDAO } from "@business/dao/AccountDAO";
import { AuthorDAO } from "@business/dao/AuthorDAO";
import { AccountSchema } from "shared";
import { BusinessRuleException } from "@business/Exception";
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

      return mySQL.begin(async (transaction) => {
        await AuthorDAO.createOne(transaction, credentials);
        const author = await AuthorDAO.getOneByDisplayName(credentials.display_name, transaction);

        if (author.error) throw author.error;

        const account: AccountSchema.InsertAccountShape = {
          id_author: author.data.id_author,
          email: credentials.email,
          password: await Bun.password.hash(credentials.password, "bcrypt"),
        };

        await AccountDAO.createOne(transaction, account);
      });
    });
  }

  export function handleSignIn(data: unknown) {
    return ErrorHandler.useAwait(async () => {
      const credentials = AccountSchema.getValidSignInShape(data);
      const account = await AccountDAO.findOneByDisplayName(credentials.display_name);

      if (account.error) throw account.error;

      if (account.data && (await isCorrectPassword(credentials.password, account.data.password))) {
        return createJWTToken(account.data);
      }

      throw new BusinessRuleException("Cannot sign in because of invalid credentials.");
    });
  }

  function isCorrectPassword(password: string, hash: string) {
    return Bun.password.verify(password, hash, "bcrypt");
  }

  function createJWTToken(context: Pick<AccountSchema.AccountShape, "id_author">) {
    return sign(
      {
        idAuthor: context.id_author,
        exp: Utility.calculateFutureTimestamp(15, "minutes"),
      },
      process.env.ACCESS_TOKEN!,
      "HS256",
    );
  }
}
