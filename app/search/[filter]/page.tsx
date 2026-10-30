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
import { getSearchMoviesFromTmdb } from "@/utils/fetchSearchMovies";
import { isPositiveInteger } from "@/utils/isPositiveInteger";
import { searchFilters } from "@/data/filterList";
import { notFound } from "next/navigation";
import { getFirstParamOrEmptyString } from "@/utils/getFirstParam";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search/[filter]">): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const queryParam = resolvedSearchParams.query;
  const query = getFirstParamOrEmptyString(queryParam);

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
  const query = getFirstParamOrEmptyString(queryParam);
  const pageParam = Number(resolvedSearchParams.page);
  const page = isPositiveInteger(pageParam) ? pageParam : 1;
  const queryClient = new QueryClient();

  const linksArray = searchFilters.map((lNames) => lNames.linkName);
  if (linksArray.indexOf(filter) === -1) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["search-movies", page, filter, query],
    queryFn: () => getSearchMoviesFromTmdb(page, filter, query),
  });

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
