import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieListSchema } from "@/utils/fetchMovieList";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET() {
  return tmdbRouteHandler(async () => {
    const response = await tmdbFetch("/trending/movie/day");
    const data = movieListSchema.parse(await response.json());
    return data.results.slice(0, 10);
  });
}
