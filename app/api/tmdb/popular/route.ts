import { fetchPopularMoviesFromTmdb } from "@/utils/fetchPopularMovies";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";
import { isPositiveInteger } from "@/utils/isPositiveInteger";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortby = searchParams.get("sortBy") ?? "";
  const genreId =
    searchParams.get("genreId")?.split(",").filter(Boolean).map(Number) ?? [];
  const pageNumber = isPositiveInteger(Number(searchParams.get("page")))
    ? Number(searchParams.get("page"))
    : 1;

  return tmdbRouteHandler(() =>
    fetchPopularMoviesFromTmdb(sortby, genreId, pageNumber),
  );
}
