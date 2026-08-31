import styles from "./page.module.scss";
import { SearchResultsContent } from "./SearchResultsContent";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search/[filter]">): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const queryParam = resolvedParams.query;
  const query = Array.isArray(queryParam)
    ? (queryParam[0] ?? "")
    : (queryParam ?? "");

  return {
    title: `${query} - The Movie Database(TMDB)`,
  };
}

export default async function SearchResults({
  searchParams,
}: PageProps<"/search/[filter]">) {
  const resolvedParams = await searchParams;

  const queryParam = resolvedParams.query;
  const query = Array.isArray(queryParam)
    ? (queryParam[0] ?? "")
    : (queryParam ?? "");
  const pageParam = resolvedParams.page;
  const page = Number(pageParam) ? Number(pageParam) : 1;

  return (
    <div className={styles.movieCards}>
      <SearchResultsContent query={query} page={page} />
    </div>
  );
}
