type buildMovieUrlParams = {
  id: string;
  title: string;
};

export function buildMovieUrl({ id, title }: buildMovieUrlParams) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return `/movie/${encodeURIComponent([id, slug].join("-"))}`;
}
