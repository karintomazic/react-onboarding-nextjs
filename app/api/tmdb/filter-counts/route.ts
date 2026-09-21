import { fetchTmdbAllCounts } from "@/utils/fetchFilterLinks";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  try {
    const data = await fetchTmdbAllCounts(query);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
