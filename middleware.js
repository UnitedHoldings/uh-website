import { NextResponse } from 'next/server'

// Allow all paths while in development/beta
export function middleware(request) {
  // Allow all paths for now since we're using localStorage for auth
  return NextResponse.next()
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'],
}