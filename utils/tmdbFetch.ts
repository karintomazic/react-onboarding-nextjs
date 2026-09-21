export async function tmdbFetch(path: string) {
  return fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN ?? ""}`,
    },
  });
}
