import { describe, it, expect } from "vitest";
import { isPositiveInteger } from "./isPositiveInteger";

describe("isPositiveInteger", () => {
  it("returns true for a positive whole number", () => {
    expect(isPositiveInteger(1)).toBe(true);
  });
  it("returns false for a 0", () => {
    expect(isPositiveInteger(0)).toBe(false);
  });
  it("returns false for a negative number", () => {
    expect(isPositiveInteger(-5)).toBe(false);
  });
  it("returns false for a decimal", () => {
    expect(isPositiveInteger(1.5)).toBe(false);
  });
  it("returns false for NaN", () => {
    expect(isPositiveInteger(NaN)).toBe(false);
  });
  it("returns false for Infinity", () => {
    expect(isPositiveInteger(Infinity)).toBe(false);
  });
});
