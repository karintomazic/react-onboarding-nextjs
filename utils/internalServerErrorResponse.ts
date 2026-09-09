export function internalServerErrorResponse(error: unknown) {
  console.error(error);
  return Response.json(
    { error: "Something went wrong, please try again" },
    { status: 500 },
  );
}
