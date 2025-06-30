import { NextResponse } from 'next/server';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validasi data
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password diperlukan' },
        { status: 400 }
      );
    }

    // Validasi credentials
    // Dalam aplikasi produksi, gunakan database dan hash password
    if (username !== config.admin.username || password !== config.admin.password) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Buat token JWT
    const secret: Secret = config.jwt.secret;
    const options: SignOptions = { expiresIn: 86400 }; // 24 hours in seconds
    const token = jwt.sign({ username, role: 'admin' }, secret, options);

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set(config.cookie.name, token, {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      maxAge: config.cookie.maxAge,
      path: config.cookie.path,
      sameSite: config.cookie.sameSite,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Login berhasil'
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
} 