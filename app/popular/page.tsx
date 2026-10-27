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

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["popular-movies-page", sort, genres],
      queryFn: ({ pageParam }) =>
        fetchPopularMoviesFromTmdb(
          sort,
          genres ? genres.split(",").map(Number) : [],
          pageParam,
        ),
      initialPageParam: 1,
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
          <PopularMoviesContent genres={genres} sort={sort} />
        </HydrationBoundary>
      </div>
    </SingleColumn>
  );
}
