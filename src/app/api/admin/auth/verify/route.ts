import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { config } from '@/lib/config';

export async function GET() {
  try {
    // Dapatkan token dari cookie
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookie.name)?.value;

    // Jika tidak ada token, return error
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verifikasi token
    try {
      const decoded = jwt.verify(token, config.jwt.secret as jwt.Secret);
      
      // Token valid, kembalikan data user
      return NextResponse.json({
        success: true,
        user: {
          username: (decoded as any).username,
          role: (decoded as any).role
        }
      });
    } catch (error) {
      // Token tidak valid
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return NextResponse.json(
      { error: 'Authentication verification failed' },
      { status: 500 }
    );
  }
} 