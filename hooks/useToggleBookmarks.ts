import { toggleBookmark } from "@/utils/toggleBookmark";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQueryClient } from "@tanstack/react-query";
import { useBanner } from "@/hooks/useBanner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type UseToggleBookmarkProps = {
  movieId: number;
};

export function useToggleBookmark({ movieId }: UseToggleBookmarkProps) {
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

  const handleAddToBookmark = async () => {
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
  };

  return { isBookmarked, handleAddToBookmark };
}
