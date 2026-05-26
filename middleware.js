import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es", "ja", "pt-BR", "ko", "zh"];
const LOCALE_PREFIXES = ["/de", "/fr", "/es", "/ja", "/pt-br", "/ko", "/zh"];
const DEFAULT_LOCALE = "en";

// Map Accept-Language codes to our locale prefixes
const LANG_MAP = {
  de: "/de",
  fr: "/fr",
  es: "/es",
  ja: "/ja",
  pt: "/pt-br",
  ko: "/ko",
  zh: "/zh",
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip for API routes, static files, _next, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/llms") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // If user is on a locale-prefixed route, let them through
  if (LOCALE_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // For the root path "/" or English routes, check if the user has a locale cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && LANG_MAP[localeCookie]) {
    // Only redirect from root "/" to the preferred locale
    if (pathname === "/") {
      return NextResponse.redirect(new URL(LANG_MAP[localeCookie], request.url));
    }
  }

  // Don't auto-redirect based on Accept-Language to avoid SEO issues
  // The language dropdown handles manual switching, and the cookie remembers the choice
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
