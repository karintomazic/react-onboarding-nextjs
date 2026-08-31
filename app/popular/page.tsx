import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import { popularMoviesPageLabels } from "@/data/labels";
import { Suspense } from "react";
import PopularMoviesContent from "./PopularMoviesContent";
import { DEFAULT_SORT } from "@/data/sortingOptions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Movies Page - The Movie Database(TMDB)",
};

export default async function PopularMovies({
  searchParams,
}: PageProps<"/popular">) {
  const resolvedParams = await searchParams;
  const genresParam = resolvedParams.genres;
  const genres = Array.isArray(genresParam)
    ? (genresParam[0] ?? "")
    : (genresParam ?? "");

  const sortParam = resolvedParams.sort;
  const sort = Array.isArray(sortParam)
    ? (sortParam[0] ?? DEFAULT_SORT.value)
    : (sortParam ?? DEFAULT_SORT.value);

  return (
    <SingleColumn>
      <div className={styles.PopularMoviesContainer}>
        <h2>{popularMoviesPageLabels.heading}</h2>
        <Suspense fallback={null}>
          <PopularMoviesContent genres={genres} sort={sort} />
        </Suspense>
      </div>
    </SingleColumn>
  );
}
