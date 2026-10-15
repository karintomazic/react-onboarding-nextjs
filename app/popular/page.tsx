import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import { popularMoviesPageLabels } from "@/data/labels";
import PopularMoviesContent from "./PopularMoviesContent";
import { DEFAULT_SORT } from "@/data/sortingOptions";
import type { Metadata } from "next";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchPopularMoviesFromTmdb } from "@/utils/fetchPopularMovies";
import { fetchGenresFromTmdb } from "@/utils/fetchGenres";
import {
  getFirstParam,
  getFirstParamOrEmptyString,
} from "@/utils/getFirstParam";
import { isPositiveInteger } from "@/utils/isPositiveInteger";

export const metadata: Metadata = {
  title: "Popular Movies Page - The Movie Database(TMDB)",
};

export default async function PopularMovies({
  searchParams,
}: PageProps<"/popular">) {
  const resolvedParams = await searchParams;
  const genresParam = resolvedParams.genres;
  const genres = getFirstParamOrEmptyString(genresParam);
  const sortParam = resolvedParams.sort;
  const sort = getFirstParam(sortParam, DEFAULT_SORT.value);
  const queryClient = new QueryClient();
  const pageParam = Number(resolvedParams.page);
  const page = isPositiveInteger(pageParam) ? pageParam : 1;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["popular-movies-page", sort, genres, page],
      queryFn: () =>
        fetchPopularMoviesFromTmdb(
          sort,
          genres ? genres.split(",").map(Number) : [],
          page,
        ),
    }),
    queryClient.prefetchQuery({
      queryKey: ["genre-list"],
      queryFn: fetchGenresFromTmdb,
    }),
  ]);

  return (
    <SingleColumn>
      <div className={styles.PopularMoviesContainer}>
        <h2>{popularMoviesPageLabels.heading}</h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PopularMoviesContent genres={genres} sort={sort} page={page} />
        </HydrationBoundary>
      </div>
    </SingleColumn>
  );
}
