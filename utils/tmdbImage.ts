import { tmdbImageUrl, tmdbBackdropUrl } from "@/data/tmdb";

type TmdbPath = string | null | undefined;

export function getTmdbImageUrl(path: TmdbPath) {
  return path ? `${tmdbImageUrl}${path}` : "";
}

export function getTmdbBackdropUrl(path: TmdbPath) {
  return path ? `${tmdbBackdropUrl}${path}` : "";
}
