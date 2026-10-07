export function getFirstParam(
  value: string | string[] | undefined,
  fallback: string,
) {
  return [value].flat()[0] ?? fallback;
}
