export function getFieldError(
  serverError: string | undefined,
  touched: boolean,
  localError: string | undefined,
) {
  if (serverError) {
    return serverError;
  }

  if (touched) {
    return localError;
  }

  return undefined;
}
