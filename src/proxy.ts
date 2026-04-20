import NextAuth from "next-auth";

import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthed = !!req.auth;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/examples") && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return Response.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/examples";
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
