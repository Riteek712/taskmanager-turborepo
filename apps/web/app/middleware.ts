// apps/frontend/src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = localStorage.getItem('token')
    
    if (!token) {
      // Redirect to login with the original URL as a callback
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}