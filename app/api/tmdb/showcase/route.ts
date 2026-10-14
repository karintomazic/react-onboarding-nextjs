import { fetchShowcaseDataFromTmdb } from "@/utils/fetchShowcaseData";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET() {
  return tmdbRouteHandler(() => fetchShowcaseDataFromTmdb());
}
