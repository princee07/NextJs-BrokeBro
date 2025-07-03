import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl.clone()

  // If the user is visiting a referral link, store the code in a cookie.
  const referralCode = url.searchParams.get('ref')
  if (referralCode) {
    // Set cookie for 30 days to ensure it persists through the signup flow
    response.cookies.set('brokebro_ref', referralCode, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    })

    // If user is on homepage with ref code, redirect to signup
    if (url.pathname === '/' && referralCode) {
      url.pathname = '/signup'
      url.searchParams.set('ref', referralCode)
      return NextResponse.redirect(url)
    }
  }

  return response
}

// This middleware will run on all paths
export const config = {
  matcher: '/:path*',
} 