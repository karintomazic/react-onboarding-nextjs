import { fetchPopularMoviesFromTmdb } from "@/utils/fetchPopularMovies";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortby = searchParams.get("sortBy") ?? "";
  const genreId =
    searchParams.get("genreId")?.split(",").filter(Boolean).map(Number) ?? [];

  return tmdbRouteHandler(() => fetchPopularMoviesFromTmdb(sortby, genreId));
}
