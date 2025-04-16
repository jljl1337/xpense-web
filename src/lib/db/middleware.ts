import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function updateSession(
  request: NextRequest,
  publicRoutes: string[],
) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not authenticated and the route is not public
  // redirect to login page
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}
