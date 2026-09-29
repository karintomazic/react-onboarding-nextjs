import { searchFilters } from "@/data/filterList";
import { tmdbFetch } from "./tmdbFetch";
import { z } from "zod";

const countsDataSchema = z.array(
  z.object({
    filter: z.string(),
    count: z.number(),
  }),
);

const tmdbCountResponseSchema = z.object({
  total_results: z.number(),
});

// client-safe version
export async function fetchAllCounts(query: string) {
  const response = await fetch(
    `/api/tmdb/filter-counts?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = countsDataSchema.parse(await response.json());
  return data;
}

// server version calling tmdbFetch
export async function fetchTmdbAllCounts(query: string) {
  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      tmdbFetch(`/search/${linkName}?query=${query}&page=1`)
        .then(async (r) => tmdbCountResponseSchema.parse(await r.json()))
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}
