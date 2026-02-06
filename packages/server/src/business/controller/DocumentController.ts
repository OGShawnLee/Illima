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

  export async function getAllByAuthor(id: number) {
    const { data: authorList, error } = await DocumentDAO.getAllByAuthor(id);

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

  export async function updateOne(data: unknown) {
    const { error } = await DocumentService.updateOne(data);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(null, { status: 201 });
  }

  export async function deleteOne(id: string) {
    const { error } = await DocumentDAO.deleteOne(id);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(null, { status: 204 });
  }
}
