import { searchFilters } from "@/data/filterList";
import { tmdbFetch } from "./tmdbFetch";
import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";

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
  return apiFetch(
    apiUrl(`filter-counts?query=${encodeURIComponent(query)}`),
    countsDataSchema,
  );
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
