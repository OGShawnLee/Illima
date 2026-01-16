import BusinessRuleException from "@business/BusinessRuleException";
import InvalidRequestException from "@business/InvalidRequestException";
import UserDisplayableException from "@business/UserDisplayableException";

export type Result<Data, Error> =
  | { data: null; failed: true; error: Error }
  | { data: Data; failed: false; error: null };

namespace ErrorHandler {
  export async function useAwait<T>(getter: () => Promise<T>) {
    try {
      return { data: await getter(), failed: false, error: null };
    } catch (error) {
      return { data: null, failed: true, error: getUserDisplayableException(error) };
    }
  }

  function getUserDisplayableException(error: unknown) {
    if (
      error instanceof UserDisplayableException ||
      (error instanceof Error && error.name == "ValiError")
    ) {
      return error;
    }

    return new UserDisplayableException("An unexpected error ocurred.", error);
  }

  export function getErrorResponse(error: unknown) {
    if (
      error instanceof BusinessRuleException ||
      error instanceof InvalidRequestException ||
      (error instanceof Error && error.name == "ValiError")
    ) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error instanceof UserDisplayableException) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "An unexcepted error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default ErrorHandler;
