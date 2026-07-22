import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role; // "seeker" | "recruiter" | "admin"
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Already logged in? Don't let them see login/register again.
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRoutes = ["/dashboard", "/my-jobs", "/my-companies", "/saved"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Not logged in but trying to hit a protected route
  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin-only areas
  const adminOnlyRoutes = ["/dashboard/admin"];
  const isAdminOnly = adminOnlyRoutes.some((route) => pathname.startsWith(route));

  if (isAdminOnly && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Recruiter-only areas — posting jobs, managing companies
  const recruiterOnlyRoutes = ["/my-jobs", "/my-companies"];
  const isRecruiterOnly = recruiterOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isRecruiterOnly && role !== "recruiter" && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Seeker-only areas — saved jobs
  const seekerOnlyRoutes = ["/saved"];
  const isSeekerOnly = seekerOnlyRoutes.some((route) => pathname.startsWith(route));

  if (isSeekerOnly && role === "recruiter") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/my-jobs/:path*",
    "/my-companies/:path*",
    "/saved/:path*",
  ],
};