import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/en/login')) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/en/login', request.url))
    }
  }
  return NextResponse.next();
}
 
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*'],
  // matcher: ['/', '/(vi|en)/', '/en/']
};