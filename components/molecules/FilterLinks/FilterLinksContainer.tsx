"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountsFromApi } from "@/utils/fetchFilterLinks";
import FilterLinks from "./FilterLinks";
import { getFirstParamOrEmptyString } from "@/utils/getFirstParam";

export default function FilterLinksContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { filter } = useParams();
  console.log(filter);
  const activeFilter = getFirstParamOrEmptyString(filter);

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCountsFromApi(query),
  });

  const totalCount = filterQuery.data;

  function getFilterHref(linkName: string) {
    return `/search/${linkName}?query=${encodeURIComponent(query)}`;
  }

  return (
    <FilterLinks
      totalCount={totalCount}
      filter={activeFilter}
      getFilterHref={getFilterHref}
    />
  );
}
