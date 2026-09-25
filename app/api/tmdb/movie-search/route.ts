import { fetchTmdbSearchMovies } from "@/utils/fetchSearchMovies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "";
  const query = searchParams.get("query") ?? "";
  const pageNumber = searchParams.get("page") ?? "";

  try {
    const data = await fetchTmdbSearchMovies(Number(pageNumber), filter, query);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
