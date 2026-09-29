export function apiUrl(path: string) {
  return `/api/tmdb/${path.replace(/^\/+/, "")}`;
}
