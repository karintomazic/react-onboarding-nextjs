import { searchFilters } from "@/data/filterList";
import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { getSearchMoviesFromTmdb } from "./fetchSearchMovies";

const countsDataSchema = z.array(
  z.object({
    filter: z.string(),
    count: z.number(),
  }),
);

// client-safe version
export async function fetchAllCountsFromApi(query: string) {
  return apiFetch(
    apiUrl(`filter-counts?query=${encodeURIComponent(query)}`),
    countsDataSchema,
  );
}

// server version - fetch the first page for every category
export async function fetchAllCountsFromTmdb(query: string) {
  const results = await Promise.all(
    searchFilters.map(async ({ linkName }) => {
      const data = await getSearchMoviesFromTmdb(1, linkName, query);
      return { filter: linkName, count: data.totalResults };
    }),
  );

  return results;
}
