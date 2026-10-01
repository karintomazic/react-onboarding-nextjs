import { movieListSchema } from "@/utils/fetchMovieList";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";
import { tmdbFetch } from "@/utils/tmdbFetch";

export async function GET() {
  return tmdbRouteHandler(async () => {
    const data = await tmdbFetch(`/trending/movie/day`, movieListSchema);
    return data.results;
  });
}
