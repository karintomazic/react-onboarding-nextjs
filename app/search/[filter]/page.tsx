import styles from "./page.module.scss";
import { SearchResultsContent } from "./SearchResultsContent";
import { Metadata } from "next";
import SearchFilterPanel from "@/components/molecules/SearchFilterPanel/SearchFilterPanel";
import FilterLinksContainer from "@/components/molecules/FilterLinks/FilterLinksContainer";
import { searchFilterPanelLabels } from "@/data/labels";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchTmdbAllCounts } from "@/utils/fetchFilterLinks";
import { fetchTmdbSearchMovies } from "@/utils/fetchSearchMovies";
import { isValidMovieId } from "@/utils/isValidMovieId";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search/[filter]">): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;

  const queryParam = resolvedSearchParams.query;
  const query = Array.isArray(queryParam)
    ? (queryParam[0] ?? "")
    : (queryParam ?? "");

  return {
    title: `${query} - The Movie Database(TMDB)`,
  };
}

export default async function SearchResults({
  searchParams,
  params,
}: PageProps<"/search/[filter]">) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const filter = resolvedParams.filter;

  const queryParam = resolvedSearchParams.query;
  const query = [queryParam].flat()[0] ?? "";
  const pageParam = Number(resolvedSearchParams.page);
  const page = isValidMovieId(pageParam) ? pageParam : 1;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["filter-counts", query],
      queryFn: () => fetchTmdbAllCounts(query),
    }),
    queryClient.prefetchQuery({
      queryKey: ["search-movies", page, filter, query],
      queryFn: () => fetchTmdbSearchMovies(page, filter, query),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchFilterPanel heading={searchFilterPanelLabels.heading}>
        <Suspense fallback={null}>
          <FilterLinksContainer />
        </Suspense>
      </SearchFilterPanel>
      <div className={styles.movieCards}>
        <SearchResultsContent query={query} page={page} filter={filter} />
      </div>
    </HydrationBoundary>
  );
}
