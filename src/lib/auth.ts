import jwt from 'jsonwebtoken';
import { config } from '@/lib/config';

// Interface untuk JWT payload
interface JWTPayload {
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Fungsi untuk memverifikasi token admin
export function verifyAdminToken(request: Request): boolean {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    
    let token: string | null = null;
    
    // Cek dari Authorization header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Cek dari cookie jika tidak ada di header
    if (!token && cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      
      token = cookies[config.cookie.name];
    }
    
    if (!token) return false;
    
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    return decoded && decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

// Fungsi untuk mendapatkan user info dari token
export function getUserFromToken(request: Request): JWTPayload | null {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    
    let token: string | null = null;
    
    // Cek dari Authorization header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Cek dari cookie jika tidak ada di header
    if (!token && cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      
      token = cookies[config.cookie.name];
    }
    
    if (!token) return null;
    
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}