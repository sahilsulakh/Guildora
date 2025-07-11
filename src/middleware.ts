import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/admin', '/member', '/portal-selection', '/admin-profile'];

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/discord-auth', request.url))
  }

  if (pathname === '/discord-auth' && token) {
    return NextResponse.redirect(new URL('/portal-selection', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
