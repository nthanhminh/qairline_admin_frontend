import { NextRequest, NextResponse } from 'next/server';
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')
  console.info(request.nextUrl.pathname);
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/en/login')) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/en/login', request.url))
    }
  } else {
    if(request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/en') {
      return NextResponse.redirect(new URL('/en/dashboard', request.url));
    }
  }
  return NextResponse.next();
}
 
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*'],
  // matcher: ['/', '/(vi|en)/', '/en/']
};