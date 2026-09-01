import styles from "./page.module.scss";
import { SearchResultsContent } from "./SearchResultsContent";
import { Metadata } from "next";

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
  const query = Array.isArray(queryParam)
    ? (queryParam[0] ?? "")
    : (queryParam ?? "");
  const pageParam = resolvedSearchParams.page;
  const page = Number(pageParam) ? Number(pageParam) : 1;

  return (
    <div className={styles.movieCards}>
      <SearchResultsContent query={query} page={page} filter={filter} />
    </div>
  );
}
