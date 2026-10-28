import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats an ISO date as day, month name and year", () => {
    expect(formatDate("2026-09-30")).toBe("30 September 2026");
  });

  it("does not pad a single digit day with a zero", () => {
    expect(formatDate("2026-03-05")).toBe("5 March 2026");
  });

  it("returns 'Invalid Date' for an empty string", () => {
    expect(formatDate("")).toBe("Invalid Date");
  });
});
