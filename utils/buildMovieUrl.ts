type BuildMovieUrlParams = {
  id: number;
  title: string;
};

export function buildMovieUrl({ id, title }: BuildMovieUrlParams) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `/movie/${[id, slug].join("-")}`;
}
