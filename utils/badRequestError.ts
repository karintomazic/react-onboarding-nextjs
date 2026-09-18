export function badRequestError(error: unknown) {
  if (error instanceof SyntaxError || error instanceof TypeError) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }
}
