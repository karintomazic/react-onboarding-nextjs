export async function tmdbRouteHandler<T>(fetchFn: () => Promise<T>) {
  try {
    const data = await fetchFn();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
