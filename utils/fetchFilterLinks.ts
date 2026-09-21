import { searchFilters } from "@/data/filterList";
import { tmdbFetch } from "./tmdbFetch";

// client-safe version
export async function fetchAllCounts(query: string) {
  const response = await fetch(
    `/api/tmdb/filter-counts?query=${encodeURIComponent(query)}`,
  );

  return response.json() as Promise<{ filter: string; count: number }[]>;
}

// server version calling tmdbFetch
export async function fetchTmdbAllCounts(query: string) {
  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      tmdbFetch(`/search/${linkName}?query=${query}&page=1`)
        .then((r) => r.json() as Promise<{ total_results: number }>)
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}
