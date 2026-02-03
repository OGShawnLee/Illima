import type { Context, HonoRequest } from "hono";
import type { Result } from "@business/ErrorHandler";
import ErrorHandler from "@business/ErrorHandler";
import { UserDisplayableException } from "@business/Exception";

namespace Utility {
  /**
   * Calculates a future Unix timestamp (in seconds) for JWT claims or expiration checks.
   * @param {number} amount - The quantity of time to add.
   * @param {'minutes' | 'hours' | 'days'} unit - The unit of time.
   * @param {number} [currentTimeInMS = Date.now()] - Optional millisecond timestamp to use as the base (useful for testing).
   * @returns {number} The future time in Unix seconds (seconds since Epoch).
   * @example
   * const exp = calculateFutureTimestamp(15, 'minutes'); // 15 mins from now
   */
  export function calculateFutureTimestamp(
    amount: number,
    unit: "minutes" | "hours" | "days",
    currentTimeInMS: number = Date.now(),
  ): number {
    const SECONDS_PER_UNIT = {
      minutes: 60,
      hours: 3600,
      days: 86400,
    };

    const currentUnixSeconds = Math.floor(currentTimeInMS / 1000);
    const additionalSeconds = amount * SECONDS_PER_UNIT[unit];

    return (currentUnixSeconds + additionalSeconds) * 1000;
  }

  export async function getDataFromPostRequest(
    request: HonoRequest,
  ): Promise<Result<unknown, UserDisplayableException>> {
    const header = request.header("Content-Type") ?? request.header("content-type");

    if (header == undefined) {
      return {
        failed: true,
        data: null,
        error: new UserDisplayableException(
          "Cannot continue with request. Expected 'Content-Type' (application/json or multipart/form-data) header.",
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
        "Cannot continue with request. Expected form-data or json.",
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
