import { z } from "zod";

export async function tmdbFetch<T extends z.ZodType>(
  path: string,
  schema: T,
): Promise<z.infer<T>> {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is not set");
  }

  const response = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = schema.parse(await response.json());
  return data;
}
