import { searchFilters } from "@/data/filterList";
import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
// import { tmdbFetch } from "./tmdbFetch";
import { searchResultsSchema } from "./fetchSearchMovies";
import { fetchTmdbSearchMovies } from "./fetchSearchMovies";

const countsDataSchema = z.array(
  z.object({
    filter: z.string(),
    count: z.number(),
    result: searchResultsSchema,
  }),
);

// const tmdbCountResponseSchema = z.object({
//   total_results: z.number(),
// });

// client-safe version
export async function fetchAllCounts(query: string) {
  return apiFetch(
    apiUrl(`filter-counts?query=${encodeURIComponent(query)}`),
    countsDataSchema,
  );
}

// server version
export async function fetchTmdbAllCounts(query: string) {
  const results = await Promise.all(
    searchFilters.map(async ({ linkName }) => {
      const data2 = await fetchTmdbSearchMovies(1, linkName, query);


      // const data = await tmdbFetch(
      //   `/search/${linkName}?query=${query}&page=1`,
      //   tmdbCountResponseSchema,
      // );

      return { filter: linkName, count: data2.totalResults, result: data2 };
    }),
  );

  return results;
}
