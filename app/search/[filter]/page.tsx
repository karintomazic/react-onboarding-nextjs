import { Metadata } from "next";
import { isPositiveInteger } from "@/utils/isPositiveInteger";
import { searchFilters } from "@/data/filterList";
import { notFound } from "next/navigation";
import { getFirstParamOrEmptyString } from "@/utils/getFirstParam";
import { SearchResultsPage } from "./SearchResultsPage";

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

  const linksArray = searchFilters.map((lNames) => lNames.linkName);
  if (linksArray.indexOf(filter) === -1) {
    notFound();
  }

  return <SearchResultsPage filter={filter} query={query} page={page} />;
}
