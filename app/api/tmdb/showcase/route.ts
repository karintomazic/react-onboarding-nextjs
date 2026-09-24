import { fetchTmdbShowcaseData } from "@/utils/fetchShowcaseData";

export async function GET() {
  try {
    const data = await fetchTmdbShowcaseData();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
