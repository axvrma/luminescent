import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/stroybook') {
    const destination = new URL(request.url);
    destination.pathname = '/stroybook/';
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/stroybook',
};
