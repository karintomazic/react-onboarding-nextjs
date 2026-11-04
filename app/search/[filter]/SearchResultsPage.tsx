import styles from "./page.module.scss";
import { fetchSearchMoviesFromTmdb } from "@/utils/fetchSearchMovies";
import { SearchResultsContent } from "./SearchResultsContent";
import SearchFilterPanel from "@/components/molecules/SearchFilterPanel/SearchFilterPanel";
import FilterLinksContainer from "@/components/molecules/FilterLinks/FilterLinksContainer";
import { searchFilterPanelLabels } from "@/data/labels";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type SearchResultsPageParams = {
  query: string;
  page: number;
  filter: string;
};

export async function SearchResultsPage({
  filter,
  query,
  page,
}: SearchResultsPageParams) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search-movies", page, filter, query],
    queryFn: () => fetchSearchMoviesFromTmdb(page, filter, query),
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
