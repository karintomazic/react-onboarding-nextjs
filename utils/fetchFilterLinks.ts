import { searchFilters } from "@/data/filterList";
import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";

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
export async function fetchAllCountsFromApi(query: string) {
  return apiFetch(
    apiUrl(`filter-counts?query=${encodeURIComponent(query)}`),
    countsDataSchema,
  );
}

// server version - only reads the total for every category
export async function fetchAllCountsFromTmdb(query: string) {
  const results = await Promise.all(
    searchFilters.map(async ({ linkName }) => {
      const data = await tmdbFetch(
        `/search/${linkName}?query=${encodeURIComponent(query)}&page=1`,
        tmdbCountResponseSchema,
      );
      return { filter: linkName, count: data.total_results };
    }),
  );

  return results;
}
