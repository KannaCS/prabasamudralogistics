import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { config as appConfig } from '@/lib/config';

// Fungsi untuk memverifikasi token
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, appConfig.jwt.secret as jwt.Secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  // Periksa apakah request menuju rute admin (kecuali halaman login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin' && 
      !request.nextUrl.pathname.startsWith('/admin/api')) {
    
    // Dapatkan token dari cookie
    const token = request.cookies.get(appConfig.cookie.name)?.value;
    
    // Jika tidak ada token, redirect ke halaman login
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // Verifikasi token
    const decoded = verifyToken(token);
    
    // Jika token tidak valid, redirect ke halaman login
    if (!decoded) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  // Periksa apakah request menuju API admin
  if (request.nextUrl.pathname.startsWith('/api/admin') && 
      !request.nextUrl.pathname.startsWith('/api/admin/login')) {
    
    // Dapatkan token dari cookie
    const token = request.cookies.get(appConfig.cookie.name)?.value;
    
    // Jika tidak ada token, kirim respons error
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verifikasi token
    const decoded = verifyToken(token);
    
    // Jika token tidak valid, kirim respons error
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const middlewareConfig = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}; 