import { describe, it, expect } from "vitest";
import { buildMovieUrl } from "./buildMovieUrl";

describe("buildMovieUrl", () => {
  it("joins the id and the title with a hyphen", () => {
    expect(buildMovieUrl({ id: 1283515, title: "verity" })).toBe(
      "/movie/1283515-verity",
    );
  });
  it("lowercases the title", () => {
    expect(buildMovieUrl({ id: 1283515, title: "Verity" })).toBe(
      "/movie/1283515-verity",
    );
  });
  it("replaces spaces with hyphens", () => {
    expect(buildMovieUrl({ id: 1283515, title: "The Dark Knight" })).toBe(
      "/movie/1283515-the-dark-knight",
    );
  });
  it("replaces special characters with a hyphen", () => {
    expect(
      buildMovieUrl({ id: 1283515, title: "Spider-Man: No Way Home" }),
    ).toBe("/movie/1283515-spider-man-no-way-home");
  });

  it("removes hyphens at the start and end", () => {
    expect(buildMovieUrl({ id: 1283515, title: "Mission: Impossible!" })).toBe(
      "/movie/1283515-mission-impossible",
    );
  });

  it("replaces accented letters with hyphens", () => {
    expect(buildMovieUrl({ id: 1283515, title: "Amélie" })).toBe(
      "/movie/1283515-am-lie",
    );
  });

  it("leaves a trailing hyphen for non-Latin titles", () => {
    expect(buildMovieUrl({ id: 1283515, title: "千と千尋の神隠し" })).toBe(
      "/movie/1283515-",
    );
  });
});
