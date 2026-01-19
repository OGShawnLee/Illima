import Utility from "@business/Utility";
import { describe, expect, test } from "bun:test";

describe("calculateFutureTimestamp", () => {
  const AMOUNT = 15;
  const MOCK_DATE = "2025-09-12";
  const MINUTE_TO_MILLISECOND_RATIO = 60 * 1000;
  const HOUR_TO_MILLISECOND_RATIO = 3600 * 1000;
  const DAY_TO_MILLISECOND_RATIO = 86400 * 1000;

  test("Should return a future timestamp with minutes as unit", async () => {
    const DATE_CURRENT = new Date(MOCK_DATE).getMilliseconds();
    const DATE_FUTURE = DATE_CURRENT + AMOUNT * MINUTE_TO_MILLISECOND_RATIO;
    expect(Utility.calculateFutureTimestamp(AMOUNT, "minutes", DATE_CURRENT)).toBe(DATE_FUTURE);
  });

  test("Should return a future timestamp with hours as unit", async () => {
    const DATE_CURRENT = new Date(MOCK_DATE).getMilliseconds();
    const DATE_FUTURE = DATE_CURRENT + AMOUNT * HOUR_TO_MILLISECOND_RATIO;
    expect(Utility.calculateFutureTimestamp(AMOUNT, "hours", DATE_CURRENT)).toBe(DATE_FUTURE);
  });

  test("Should return a future timestamp with days as unit", async () => {
    const DATE_CURRENT = new Date(MOCK_DATE).getMilliseconds();
    const DATE_FUTURE = DATE_CURRENT + AMOUNT * DAY_TO_MILLISECOND_RATIO;
    expect(Utility.calculateFutureTimestamp(AMOUNT, "days", DATE_CURRENT)).toBe(DATE_FUTURE);
  });
});
