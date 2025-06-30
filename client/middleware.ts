import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl.clone()

  // If the user is visiting a referral link, store the code in a cookie.
  const referralCode = url.searchParams.get('ref')
  if (referralCode) {
    // This cookie is NOT httpOnly, so the client-side script can read it.
    response.cookies.set('brokebro_ref', referralCode, {
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    })
  }

  return response
}

// This middleware will run on all paths
export const config = {
  matcher: '/:path*',
} 