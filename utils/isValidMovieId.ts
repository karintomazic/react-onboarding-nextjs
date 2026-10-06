export function isValidMovieId(id: number) {
  return id > 0 || Number.isInteger(id);
}
