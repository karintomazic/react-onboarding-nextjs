import { describe, it, expect, vi, afterEach } from "vitest";
import { z } from "zod";
import { apiFetch } from "./apiFetch";

const schema = z.object({ id: z.number() });

describe("apiFetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls fetch with the given path", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ id: 1 }));
    vi.stubGlobal("fetch", fetchMock);

    await apiFetch("/api/test", schema);

    expect(fetchMock).toHaveBeenCalledWith("/api/test");
  });

  it("returns the parsed data when the request succeeds", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ id: 1 })));

    await expect(apiFetch("/api/test", schema)).resolves.toEqual({ id: 1 });
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );

    await expect(apiFetch("/api/test", schema)).rejects.toThrow(
      "Request failed with status 404",
    );
  });

  it("throws when the data does not match the schema", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ id: "abc" })),
    );

    await expect(apiFetch("/api/test", schema)).rejects.toThrow();
  });

  it("removes fields that are not in the schema", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ id: 1, extra: "hi" })),
    );

    await expect(apiFetch("/api/test", schema)).resolves.toEqual({ id: 1 });
  });
});
