import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const AUTH_PAGES = ["/login", "/register"];

export const proxy = async (request) => {
  const { pathname, search } = request.nextUrl;
  const session = await auth.api.getSession({ headers: request.headers });

  if (AUTH_PAGES.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/profile",
    "/books/:id",
    "/login",
    "/register",
  ],
};
