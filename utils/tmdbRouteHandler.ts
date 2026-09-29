export async function tmdbRouteHandler<T>(fetchFn: () => Promise<T>) {
  try {
    const data = await fetchFn();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
