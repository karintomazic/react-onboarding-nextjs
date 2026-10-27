import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import ShowcaseQueryFetch from "@/components/organisms/ShowcaseQueryFetch/ShowcaseQueryFetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchShowcaseDataFromTmdb } from "@/utils/fetchShowcaseData";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["showcase-movies"],
    queryFn: fetchShowcaseDataFromTmdb,
  });

  return (
    <SingleColumn>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShowcaseQueryFetch />
      </HydrationBoundary>
    </SingleColumn>
  );
}
