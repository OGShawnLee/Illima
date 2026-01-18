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
        SELECT * FROM Account WHERE id_author = (
          SELECT id_author FROM Author WHERE display_name = ${displayName} LIMIT 1
        )
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
