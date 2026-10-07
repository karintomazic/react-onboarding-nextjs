"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCounts } from "@/utils/fetchFilterLinks";
import FilterLinks from "./FilterLinks";
import { getFirstParam } from "@/utils/getFirstParam";

export default function FilterLinksContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { filter } = useParams();
  const activeFilter = getFirstParam(filter, "");

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCounts(query),
  });

  const totalCount = filterQuery.data;

  return (
    <FilterLinks
      totalCount={totalCount}
      searchParams={searchParams.toString()}
      filter={activeFilter}
    />
  );
}
