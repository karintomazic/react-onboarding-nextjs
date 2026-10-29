import { describe, it, expect } from "vitest";
import { buildMovieUrl } from "./buildMovieUrl";

describe("buildMovieUrl", () => {
  it("joins the id and the title with a hyphen", () => {
    expect(buildMovieUrl({ id: 1283515, title: "verity" })).toBe(
      "/movie/1283515-verity",
    );
  });
  it("with lowercases the title", () => {
    expect(buildMovieUrl({ id: 1283515, title: "Verity" })).toBe(
      "/movie/1283515-verity",
    );
  });
  it("replaces spaces with hyphens", () => {
    expect(buildMovieUrl({ id: 1283515, title: "The Dark Knight" })).toBe(
      "/movie/1283515-the-dark-knight",
    );
  });
  it("encodes special characters", () => {
    expect(
      buildMovieUrl({ id: 1283515, title: "Spider-Man: No Way Home" }),
    ).toBe("/movie/1283515-spider-man%3A-no-way-home");
  });
});
