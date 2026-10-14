//no fallback - may be undefined
function getFirstParam(
  value: string | string[] | undefined,
): string | undefined;

// with fallback - string
function getFirstParam(
  value: string | string[] | undefined,
  fallback: string,
): string;

// both cases
function getFirstParam(
  value: string | string[] | undefined,
  fallback?: string,
): string | undefined {
  return [value].flat()[0] ?? fallback;
}

function getFirstParamOrEmptyString(value: string | string[] | undefined) {
  return getFirstParam(value, "");
}

export { getFirstParam, getFirstParamOrEmptyString };
