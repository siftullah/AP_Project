import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicOnlyRoutes = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isAuthentiatedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdministrationRoute = createRouteMatcher(["/administration(.*)"]);
const isFacultyRoute = createRouteMatcher(["/faculty(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const newUserRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/api/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (
    isAuthentiatedRoute(req) ||
    isAdministrationRoute(req) ||
    isFacultyRoute(req) ||
    isStudentRoute(req) ||
    newUserRoute(req)
  ) {
    const { userId } = await auth();

    if (userId) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId || "");

      if (!user?.publicMetadata["role"]) {
        if (!newUserRoute(req)) {
          const url = req.nextUrl.clone();
          url.pathname = "/onboarding";

          return NextResponse.redirect(url);
        }
      } else {
        if (newUserRoute(req)) {
          const url = req.nextUrl.clone();
          url.pathname = "/dashboard";
          return NextResponse.redirect(url);
        }

        if (isAdministrationRoute(req)) {
          if (user?.publicMetadata["role"] !== "admin") {
            const url = req.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
          }
        }
        if (isFacultyRoute(req)) {
          if (user?.publicMetadata["role"] !== "faculty") {
            const url = req.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
          }
        }
        if (isStudentRoute(req)) {
          if (user?.publicMetadata["role"] !== "student") {
            const url = req.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
          }
        }
      }
    } else {
      await auth.protect();
    }
  }

  if (isPublicOnlyRoutes(req)) {
    const { userId } = await auth();

    if (userId) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
