import { searchFilters } from "@/data/filterList";
const tmbUrl = "https://api.themoviedb.org/3";

export async function fetchAllCounts(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      fetch(
        `${tmbUrl}/search/${linkName}?api_key=${apiKey}&query=${query}&page=1`,
      )
        .then((r) => r.json() as Promise<{ total_results: number }>)
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}
