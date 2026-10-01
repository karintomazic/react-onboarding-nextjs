import { TmdbError } from "./tmdbFetch";

export async function tmdbRouteHandler<T>(fetchFn: () => Promise<T>) {
  try {
    const data = await fetchFn();
    return Response.json(data);
  } catch (error) {
    console.error(error);

    if (error instanceof TmdbError) {
      return Response.json({ error: "TMDB request failed" }, { status: 502 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
