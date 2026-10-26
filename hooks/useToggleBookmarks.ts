import { toggleBookmark } from "@/utils/toggleBookmark";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQueryClient } from "@tanstack/react-query";
import { useBanner } from "@/hooks/useBanner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { startTransition, useOptimistic } from "react";

type useToggleBookmarkProps = {
  movieId: number;
};

export function useToggleBookmark({ movieId }: useToggleBookmarkProps) {
  const { showBanner } = useBanner();
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";

  const { data: bookmarksData } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
    enabled: isLoggedIn,
  });

  const queryClient = useQueryClient();

  const bookmarkMovieIds = bookmarksData?.map((m) => {
    return m.movieId;
  });

  const isBookmarked = bookmarkMovieIds?.includes(movieId) ?? false;

  const [optimisticValue, setOptimisticValue] = useOptimistic(isBookmarked);

  const handleAddToBookmark = () => {
    startTransition(async () => {
      setOptimisticValue(!isBookmarked);

      try {
        await toggleBookmark(isBookmarked, movieId);
        showBanner(
          isBookmarked
            ? "Removed from your Bookmarks list."
            : "Added to your Bookmarks list.",
          "success",
        );
        await queryClient.invalidateQueries({ queryKey: ["bookmarks-page"] });
      } catch (err) {
        showBanner(
          err instanceof Error ? err.message : "Something went wrong",
          "error",
        );
      }
    });
  };

  console.log(optimisticValue);

  return { isBookmarked: optimisticValue, handleAddToBookmark };
}
