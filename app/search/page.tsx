import { getFirstParamOrEmptyString } from "@/utils/getFirstParam";
import { isPositiveInteger } from "@/utils/isPositiveInteger";
import { SearchResultsPage } from "./[filter]/SearchResultsPage";
import { defaultSearchFilter } from "@/data/filterList";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const queryParam = resolvedSearchParams.query;
  const query = getFirstParamOrEmptyString(queryParam);

  return {
    title: `${query} - The Movie Database(TMDB)`,
  };
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const resolvedSearchParams = await searchParams;

  const queryParam = resolvedSearchParams.query;
  const query = getFirstParamOrEmptyString(queryParam);

  const pageParam = Number(resolvedSearchParams.page);
  const page = isPositiveInteger(pageParam) ? pageParam : 1;

  return (
    <SearchResultsPage query={query} page={page} filter={defaultSearchFilter} />
  );
}
