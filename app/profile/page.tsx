import ProfilePageContent from "./ProfilePageContent";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation"; // produces a real 404
import { authOptions } from "@/lib/auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  return <ProfilePageContent email={session.user.email} />;
}
