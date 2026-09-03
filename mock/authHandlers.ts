import { http, HttpResponse } from "msw";

export const sessionHandler = http.get("/api/auth/session", () =>
  HttpResponse.json({}),
);
