import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access = request.cookies.get("access")?.value;
  const protectedRoutes = ["/dashboard", "/todos", "/profile"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !access) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const publicRoutes = ["/login", "/signup", "/"];

  if (access && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/todos/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
    "/",
  ],
};
