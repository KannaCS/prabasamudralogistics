import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email';

// Fungsi validasi email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fungsi untuk membersihkan dan memvalidasi input
function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input.trim().substring(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, subject, message } = body;

    // Validasi data wajib
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        {
          error: 'Semua field diperlukan',
          details: 'fullName, email, subject, dan message harus diisi'
        },
        { status: 400 }
      );
    }

    // Validasi panjang input
    if (fullName.length > 100) {
      return NextResponse.json(
        { error: 'Nama terlalu panjang (maksimal 100 karakter)' },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject terlalu panjang (maksimal 200 karakter)' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 2000 karakter)' },
        { status: 400 }
      );
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Cek apakah ada pesan duplikat dalam 5 menit terakhir
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentContact = await prisma.contact.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        subject: subject.trim(),
        createdAt: {
          gte: fiveMinutesAgo
        }
      }
    });

    if (recentContact) {
      return NextResponse.json(
        { error: 'Anda baru saja mengirim pesan serupa. Silakan tunggu 5 menit sebelum mengirim lagi.' },
        { status: 429 }
      );
    }

    // Simpan data ke database
    const contact = await prisma.contact.create({
      data: {
        fullName: sanitizeInput(fullName, 100),
        email: email.toLowerCase().trim(),
        subject: sanitizeInput(subject, 200),
        message: sanitizeInput(message, 2000),
      },
    });

    // Send email notification to admin
    try {
      await emailService.sendNewContactNotification(contact);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the contact creation if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      },
      message: 'Pesan berhasil dikirim'
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('Database connection')) {
        return NextResponse.json(
          { error: 'Koneksi database bermasalah, silakan coba lagi nanti' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Terjadi kesalahan saat mengirim pesan',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// GET method untuk mengambil contact berdasarkan ID (untuk admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Parameter id diperlukan' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Pesan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pesan' },
      { status: 500 }
    );
  }
}