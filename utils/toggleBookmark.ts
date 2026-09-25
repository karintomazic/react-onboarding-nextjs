import { z } from "zod";

const bookmarkErrorSchema = z.object({
  error: z.string().optional(),
  formErrors: z.array(z.string()).optional(),
});

export async function toggleBookmark(isBookmarked: boolean, movieId: number) {
  const response = await fetch("/api/bookmarks", {
    method: isBookmarked ? "DELETE" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });

  if (!response.ok) {
    const { error, formErrors } = bookmarkErrorSchema.parse(
      await response.json(),
    );
    throw new Error(error ?? formErrors?.[0] ?? "Something went wrong");
  }
}
