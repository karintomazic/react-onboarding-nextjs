import { http, HttpResponse } from "msw";

export const emptyBookmarksHandler = http.get("/api/bookmarks", () =>
  HttpResponse.json([]),
);

export const bookmarksHandlers = [
  emptyBookmarksHandler,
  http.post("/api/bookmarks", () => new HttpResponse(null, { status: 204 })),
  http.delete("/api/bookmarks", () => new HttpResponse(null, { status: 204 })),
];
