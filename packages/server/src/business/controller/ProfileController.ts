import ErrorHandler from "@business/ErrorHandler";
import { ProfileDAO } from "@business/dao/ProfileDAO";

export namespace ProfileController {
  export async function getOne(idAuthor: number) {
    const { data: profile, error } = await ProfileDAO.getOne(idAuthor);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(profile), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
