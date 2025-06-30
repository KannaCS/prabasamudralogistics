// Konfigurasi aplikasi
// Dalam aplikasi produksi, simpan semua nilai-nilai ini di .env

export const config = {
  // Konfigurasi JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'praba-samudra-logistics-admin-secret-key',
    expiresIn: '24h',
  },
  
  // Konfigurasi admin
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  
  // Konfigurasi cookie
  cookie: {
    name: 'admin_token',
    maxAge: 60 * 60 * 24, // 24 jam dalam detik
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
  }
}; 