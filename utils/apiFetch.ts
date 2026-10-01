import { z } from "zod";

export async function apiFetch<T extends z.ZodType>(
  path: string,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = schema.parse(await response.json());
  return data;
}
