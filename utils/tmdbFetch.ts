import { z } from "zod";

export class TmdbError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TmdbError";
    this.status = status;
  }
}

export async function tmdbFetch<T extends z.ZodType>(
  path: string,
  schema: T,
): Promise<z.infer<T>> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is not set"); // 500 error
  }

  const response = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new TmdbError(
      `TMDB request failed with status ${response.status}`,
      response.status,
    );
  }

  // .parse - throws zods own error type, safeParse so it does not trow so we can check it
  const result = schema.safeParse(await response.json());

  if (!result.success) {
    throw new TmdbError(
      `TMDB response did not match schema: ${result.error.message}`,
      response.status,
    );
  }

  return result.data;
}
