import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/',
    '/upcoming',
    '/recordings',
    '/previous',
    '/private-room',
    '/meeting(.*)',
  ]);

const isPublicApiRoute = createRouteMatcher(['/api/token']);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req) && !isPublicApiRoute(req)) {
      auth().protect();
    }
  });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};