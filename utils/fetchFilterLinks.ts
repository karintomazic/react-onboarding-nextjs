import { searchFilters } from "@/data/filterList";
const tmbUrl = "https://api.themoviedb.org/3";
import { tmdbApiKey } from "./tmdbApiKey";

export async function fetchAllCounts(query: string) {
  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      fetch(
        `${tmbUrl}/search/${linkName}?api_key=${tmdbApiKey}&query=${query}&page=1`,
      )
        .then((r) => r.json() as Promise<{ total_results: number }>)
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}
