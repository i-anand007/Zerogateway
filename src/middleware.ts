import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    let isLoggedIn:any = (request.cookies.get('user_loggedIn')?.value);
    const url = request.nextUrl.clone();        

    if (url.pathname.startsWith("/api")) {
      return NextResponse.next()
    }

    if (isLoggedIn !== 'true' && !url.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!/auth|_next/static|_next/image|favicon.ico).*)',],
}