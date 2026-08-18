// [...nextauth] - catch-all dynamic segment - handles every URL under /api/auth/*

import NextAuth from "next-auth"; // main function - hands back a request handler managing all of Auth.js internal endpoints
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// same handler exported under both names — Auth.js endpoints need to respond to
// GET (e.g. checking the session) and POST (e.g. submitting credentials)
export { handler as GET, handler as POST };
