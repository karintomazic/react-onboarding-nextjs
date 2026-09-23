import { fetchTmdbGenres } from "@/utils/fetchGenres";

export async function GET() {
  try {
    const data = await fetchTmdbGenres();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
