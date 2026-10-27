type BuildMovieUrlParams = {
  id: number;
  title: string;
};

export function buildMovieUrl({ id, title }: BuildMovieUrlParams) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return `/movie/${encodeURIComponent([id, slug].join("-"))}`;
}
