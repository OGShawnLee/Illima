import ErrorHandler from "@business/ErrorHandler";
import { AuthorDAO } from "@business/dao/AuthorDAO";
import { AuthorService } from "@business/service/AuthorService";

export namespace AuthorController {
  export async function createOne(data: unknown) {
    const { error } = await AuthorService.createOne(data);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(null, { status: 201 });
  }

  export async function getAll() {
    const { data: authorList, error } = await AuthorDAO.getAll();

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(authorList), {
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function getOneByDisplayName(displayName: string) {
    const { data: author, error } = await AuthorDAO.getOneByDisplayName(displayName);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(author), {
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function deleteOneByDisplayName(displayName: string) {
    const { data: author, error } = await AuthorDAO.deleteOneByDisplayName(displayName);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(author), {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  }
}
