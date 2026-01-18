import ErrorHandler from "@business/ErrorHandler";
import mySQL from "@db";
import { AccountSchema } from "shared";

export namespace AccountDAO {
  export function createOne(transaction: Bun.TransactionSQL, data: unknown) {
    return transaction`INSERT INTO Account ${mySQL(AccountSchema.getValidInsertAccount(data))}`.execute();
  }

  export async function findOneByDisplayName(displayName: string) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`
        SELECT * FROM Account A JOIN Author Auth ON A.id_author = Auth.id_author WHERE Auth.display_name = ${displayName}
      `;

      if (result.length == 0) {
        return undefined;
      }

      return AccountSchema.getValidAccount(result[0]);
    });
  }

  export async function findOneByEmail(email: string) {
    return ErrorHandler.useAwait(async () => {
      const result = await mySQL`SELECT * FROM Account WHERE email = ${email}`;

      if (result.length == 0) {
        return undefined;
      }

      return AccountSchema.getValidAccount(result[0]);
    });
  }
}
