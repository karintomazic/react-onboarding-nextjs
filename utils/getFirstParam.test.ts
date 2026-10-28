import { describe, it, expect } from "vitest";
import { getFirstParam, getFirstParamOrEmptyString } from "./getFirstParam";

describe("getFirstParam", () => {
  it("returns the string as is", () => {
    expect(getFirstParam("batman")).toBe("batman");
  });

  it("returns the first item of an array", () => {
    expect(getFirstParam(["batman", "superman"])).toBe("batman");
  });

  it("returns undefined when the value is undefined", () => {
    expect(getFirstParam(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty array", () => {
    expect(getFirstParam([])).toBeUndefined();
  });

  it("returns the fallback when the value is undefined", () => {
    expect(getFirstParam(undefined, "x")).toBe("x");
  });

  it("returns the fallback for an empty array", () => {
    expect(getFirstParam([], "x")).toBe("x");
  });

  it("returns the value instead of the fallback when both are given", () => {
    expect(getFirstParam("batman", "x")).toBe("batman");
  });

  it("returns the value instead of the fallback when is just a empty string", () => {
    expect(getFirstParam("", "x")).toBe("");
  });
});

describe("getFirstParamOrEmptyString", () => {
  it("returns an empty string when the value is undefined", () => {
    expect(getFirstParamOrEmptyString(undefined)).toBe("");
  });

  it("returns the string as is", () => {
    expect(getFirstParamOrEmptyString("")).toBe("");
  });

  it("returns the first item of an array", () => {
    expect(getFirstParamOrEmptyString(["batman", "superman"])).toBe("batman");
  });
});
