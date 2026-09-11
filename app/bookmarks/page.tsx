import BookmarksPageContent from "./BookmarksPageContent";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation"; // produces a real 404
import { authOptions } from "@/lib/auth";

export default async function Bookmarks() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  return <BookmarksPageContent />;
}
