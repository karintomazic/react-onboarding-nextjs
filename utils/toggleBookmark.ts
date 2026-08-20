export async function toggleBookmark(isBookmarked: boolean, movieId: number) {
  const response = await fetch("/api/bookmarks", {
    method: isBookmarked ? "DELETE" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId: Number(movieId) }),
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error);
  }
}
