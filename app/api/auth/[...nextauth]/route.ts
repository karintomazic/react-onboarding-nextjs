import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import db from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email))
          .get();

        if (!user) return null;

        const compareCred = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        const idAdnUsername = { id: user.id.toString(), email: user.email };

        if (compareCred) {
          return idAdnUsername;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
