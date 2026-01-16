import ErrorHandler from "@business/ErrorHandler";
import { DocumentDAO } from "@business/dao/DocumentDAO";
import { DocumentService } from "@business/service/DocumentService";

export namespace DocumentController {
  export async function createOne(data: unknown) {
    const { error } = await DocumentService.createOne(data);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(null, { status: 201 });
  }

  export async function getAll() {
    const { data: authorList, error } = await DocumentDAO.getAll();

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(authorList), {
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function getOne(id: string) {
    const { data: author, error } = await DocumentDAO.getOne(id);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(author), {
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function deleteOne(id: string) {
    const { data: author, error } = await DocumentDAO.deleteOne(id);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(author), {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  }
}
