import { fetchSearchMoviesFromTmdb } from "@/utils/fetchSearchMovies";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "";
  const query = searchParams.get("query") ?? "";
  const pageNumber = searchParams.get("page") ?? "";

  return tmdbRouteHandler(() =>
    fetchSearchMoviesFromTmdb(Number(pageNumber), filter, query),
  );
}
