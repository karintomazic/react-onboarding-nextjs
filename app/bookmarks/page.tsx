"use client";

import { useSession } from "next-auth/react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQuery } from "@tanstack/react-query";

export default function Bookmarks() {
  const session = useSession();

  // console.log(session);

  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
  });

  console.log(bookmarks);
  console.log(isLoading);

  const isLoggedIn = session.status === "authenticated";
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading";

  let content;

  if (loggedInLoading) {
    content = <Spinner />;
  } else if (isLoggedIn) {
    content = <p>you are logged in</p>;
  } else if (isNotLoggedIn) {
    content = <p>you are NOT logged in</p>;
  }

  return <>{content}</>;
}
