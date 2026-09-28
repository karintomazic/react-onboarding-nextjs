"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCounts } from "@/utils/fetchFilterLinks";
import FilterLinks from "./FilterLinks";

export default function FilterLinksContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { filter } = useParams();

  const activeFilter = Array.isArray(filter) ? filter[0] : filter;

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCounts(query),
  });

  const totalCount = filterQuery.data;

  function getFilterHref(linkName: string) {
    return `/${linkName}?${searchParams.toString()}`;
  }

  return (
    <FilterLinks
      totalCount={totalCount}
      filter={activeFilter}
      getFilterHref={getFilterHref}
    />
  );
}
