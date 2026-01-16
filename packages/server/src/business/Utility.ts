import type { Context, HonoRequest } from "hono";
import type { Result } from "@business/ErrorHandler";
import UserDisplayableException from "@business/UserDisplayableException";
import ErrorHandler from "@business/ErrorHandler";

namespace Utility {
  export async function getDataFromPostRequest(
    request: HonoRequest
  ): Promise<Result<unknown, UserDisplayableException>> {
    const header = request.header("Content-Type");

    if (header == undefined) {
      return {
        failed: true,
        data: null,
        error: new UserDisplayableException(
          "Cannot continue with request. Expected 'Content-Type' (application/json or multipart/form-data) header."
        ),
      };
    }

    if (header.includes("multipart/form-data")) {
      const data = Object.fromEntries((await request.formData()).entries());
      return { failed: false, data, error: null };
    } else if (header.includes("application/json")) {
      return { failed: false, data: await request.json(), error: null };
    }

    return {
      failed: true,
      data: null,
      error: new UserDisplayableException(
        "Cannot continue with request. Expected form-data or json."
      ),
    };
  }

  export function getPostRequestHandler(controllerFunction: (data: unknown) => Promise<Response>) {
    return async (context: Context) => {
      const { data, error } = await Utility.getDataFromPostRequest(context.req);

      if (error) return ErrorHandler.getErrorResponse(error);

      return controllerFunction(data);
    };
  }
}

export default Utility;
