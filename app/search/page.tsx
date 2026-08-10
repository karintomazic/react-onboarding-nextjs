import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const resolvedParams = await searchParams;

  const query =
    typeof resolvedParams.query === "string" ? resolvedParams.query : "";

  redirect(`/search/tv${query ? `?query=${encodeURIComponent(query)}` : ""}`);
}
