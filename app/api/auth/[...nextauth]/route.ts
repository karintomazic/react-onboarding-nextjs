// [...nextauth] - catch-all dynamic segment - handles every URL under /api/auth/*

import NextAuth from "next-auth"; // main function - hands back a request handler managing all of Auth.js internal endpoints
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm"; // Drizzle equals helper for the where clause
import db from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs"; // used here to compare passwords, not hash them

const handler = NextAuth({
  providers: [ // always an array — Auth.js supports multiple login methods at once
    CredentialsProvider({
      name: "Credentials",
      credentials: { //  what fields this provider expects
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null; // reject this sign-in attempt


        //  in the database look up one user row by email
        const user = db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email))
          .get(); // fetches a single row synchronously or undefined

        if (!user) return null; // no account with this email

        // checks the plain password just typed against the already-hashed password from the database
        const compareCred = await bcrypt.compare( // have to await so we dont get a promisse object back which is always truthy
          credentials.password,
          user.password,
        );

        // builds what gets returned on success -  deliberately excluding the password hash
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

// same handler exported under both names — Auth.js endpoints need to respond to
// GET (e.g. checking the session) and POST (e.g. submitting credentials)
export { handler as GET, handler as POST };
