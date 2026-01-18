import ErrorHandler from "@business/ErrorHandler";
import { AuthService } from "@business/service/AuthService";

export namespace AuthControler {
  export async function handleSignUp(data: unknown) {
    const { data: token, error } = await AuthService.handleSignUp(data);

    if (error) {
      return ErrorHandler.getErrorResponse(error);
    }

    return new Response(JSON.stringify(token), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
