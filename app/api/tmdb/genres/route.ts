import { fetchGenresFromTmdb } from "@/utils/fetchGenres";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET() {
  return tmdbRouteHandler(() => fetchGenresFromTmdb());
}
