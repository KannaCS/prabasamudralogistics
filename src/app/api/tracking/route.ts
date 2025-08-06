import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Interface untuk timeline tracking
interface TimelineItem {
  status: string;
  date: Date;
  description: string;
  location?: string;
}

// Interface untuk data tracking
interface TrackingData {
  bookingNumber: string;
  status: string;
  origin: string;
  destination: string;
  serviceType: string;
  fullName: string;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  timeline: TimelineItem[];
  progress: number;
}

// Fungsi untuk menghitung estimasi pengiriman berdasarkan service type
function calculateEstimatedDelivery(shipmentDate: Date, serviceType: string): Date {
  const baseDate = new Date(shipmentDate);
  let daysToAdd = 7; // default

  switch (serviceType.toLowerCase()) {
    case 'domestic-shipping':
      daysToAdd = 3;
      break;
    case 'export-import':
      daysToAdd = 14;
      break;
    case 'freight-forwarding':
      daysToAdd = 10;
      break;
    case 'roro-shipping':
      daysToAdd = 5;
      break;
    case 'ship-rental':
      daysToAdd = 1;
      break;
    case 'truck-rental':
      daysToAdd = 1;
      break;
    case 'vehicle-shipping':
      daysToAdd = 7;
      break;
    default:
      daysToAdd = 7;
  }

  return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
}

// Fungsi untuk menghitung progress berdasarkan status
function calculateProgress(status: string): number {
  switch (status.toLowerCase()) {
    case 'pending':
      return 10;
    case 'confirmed':
      return 25;
    case 'processing':
      return 50;
    case 'shipped':
      return 75;
    case 'completed':
      return 100;
    case 'cancelled':
      return 0;
    default:
      return 10;
  }
}

// Fungsi untuk generate timeline berdasarkan status
function generateTimeline(booking: any): TimelineItem[] {
  const timeline: TimelineItem[] = [
    {
      status: 'Pesanan Dibuat',
      date: booking.createdAt,
      description: 'Pesanan Anda telah diterima dan sedang diproses',
      location: 'Kantor Pusat'
    }
  ];

  const dayInMs = 24 * 60 * 60 * 1000;

  if (booking.status === 'confirmed' || booking.status === 'processing' ||
      booking.status === 'shipped' || booking.status === 'completed') {
    timeline.push({
      status: 'Pesanan Dikonfirmasi',
      date: new Date(booking.createdAt.getTime() + 1 * dayInMs),
      description: 'Pesanan Anda telah dikonfirmasi dan sedang dalam persiapan',
      location: booking.origin
    });
  }

  if (booking.status === 'processing' || booking.status === 'shipped' || booking.status === 'completed') {
    timeline.push({
      status: 'Sedang Diproses',
      date: new Date(booking.createdAt.getTime() + 2 * dayInMs),
      description: 'Pesanan Anda sedang diproses dan disiapkan untuk pengiriman',
      location: booking.origin
    });
  }

  if (booking.status === 'shipped' || booking.status === 'completed') {
    timeline.push({
      status: 'Dalam Pengiriman',
      date: new Date(booking.createdAt.getTime() + 3 * dayInMs),
      description: 'Pesanan Anda sedang dalam perjalanan',
      location: 'Dalam Perjalanan'
    });
  }

  if (booking.status === 'completed') {
    timeline.push({
      status: 'Pengiriman Selesai',
      date: booking.updatedAt,
      description: 'Pesanan Anda telah selesai dikirimkan',
      location: booking.destination
    });
  }

  if (booking.status === 'cancelled') {
    timeline.push({
      status: 'Pesanan Dibatalkan',
      date: booking.updatedAt,
      description: 'Pesanan Anda telah dibatalkan',
      location: 'Kantor Pusat'
    });
  }

  return timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingNumber = searchParams.get('bookingNumber');

    // Validasi input
    if (!bookingNumber) {
      return NextResponse.json(
        {
          error: 'Nomor booking diperlukan',
          details: 'Parameter bookingNumber harus diisi'
        },
        { status: 400 }
      );
    }

    // Validasi format booking number
    if (!/^PSL\d{9}$/.test(bookingNumber)) {
      return NextResponse.json(
        { error: 'Format nomor booking tidak valid' },
        { status: 400 }
      );
    }

    // Cari booking berdasarkan nomor booking
    const booking = await prisma.booking.findUnique({
      where: {
        bookingNumber: bookingNumber,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking tidak ditemukan' },
        { status: 404 }
      );
    }

    // Generate timeline dan tracking data
    const timeline = generateTimeline(booking);
    const estimatedDelivery = calculateEstimatedDelivery(booking.shipmentDate, booking.serviceType);
    const progress = calculateProgress(booking.status);

    const trackingData: TrackingData = {
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      origin: booking.origin,
      destination: booking.destination,
      serviceType: booking.serviceType,
      fullName: booking.fullName,
      estimatedDelivery,
      actualDelivery: booking.status === 'completed' ? booking.updatedAt : undefined,
      timeline,
      progress
    };

    return NextResponse.json({
      success: true,
      data: trackingData,
      message: 'Data tracking berhasil diambil'
    });

  } catch (error) {
    console.error('Error tracking booking:', error);
    
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
        error: 'Terjadi kesalahan saat melacak pesanan',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// POST method untuk update status tracking (untuk admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingNumber, status, location } = body;

    // Validasi input
    if (!bookingNumber || !status) {
      return NextResponse.json(
        { error: 'bookingNumber dan status diperlukan' },
        { status: 400 }
      );
    }

    // Validasi status yang diizinkan
    const allowedStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status tidak valid' },
        { status: 400 }
      );
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { bookingNumber },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Status tracking berhasil diupdate'
    });

  } catch (error) {
    console.error('Error updating tracking status:', error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Booking tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupdate status' },
      { status: 500 }
    );
  }
}