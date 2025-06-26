import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Remove the dynamic export for static export compatibility

export async function GET(request: Request) {
  // In a static export, we won't have access to request.url
  // This will only work when the site is being hosted, not during build
  try {
    const { searchParams } = new URL(request.url);
    const bookingNumber = searchParams.get('bookingNumber');

    if (!bookingNumber) {
      return NextResponse.json(
        { error: 'Nomor booking diperlukan' },
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

    // Contoh data tracking sederhana
    // Dalam aplikasi nyata, Anda mungkin memiliki model terpisah untuk tracking
    const trackingData = {
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      origin: booking.origin,
      destination: booking.destination,
      serviceType: booking.serviceType,
      estimatedDelivery: new Date(new Date(booking.shipmentDate).getTime() + 7 * 24 * 60 * 60 * 1000), // Contoh: 7 hari setelah shipment date
      timeline: [
        {
          status: 'Pesanan Dibuat',
          date: booking.createdAt,
          description: 'Pesanan Anda telah diterima dan sedang diproses',
        }
      ]
    };

    // Tambahkan timeline berdasarkan status
    if (booking.status === 'confirmed') {
      trackingData.timeline.push({
        status: 'Pesanan Dikonfirmasi',
        date: booking.updatedAt,
        description: 'Pesanan Anda telah dikonfirmasi dan sedang dalam persiapan',
      });
    } else if (booking.status === 'completed') {
      trackingData.timeline.push({
        status: 'Pesanan Dikonfirmasi',
        date: new Date(booking.createdAt.getTime() + 1 * 24 * 60 * 60 * 1000), // Contoh: 1 hari setelah pembuatan
        description: 'Pesanan Anda telah dikonfirmasi dan sedang dalam persiapan',
      });
      trackingData.timeline.push({
        status: 'Pengiriman Dalam Proses',
        date: new Date(booking.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000), // Contoh: 3 hari setelah pembuatan
        description: 'Pesanan Anda sedang dalam perjalanan',
      });
      trackingData.timeline.push({
        status: 'Pengiriman Selesai',
        date: booking.updatedAt,
        description: 'Pesanan Anda telah selesai dikirimkan',
      });
    } else if (booking.status === 'cancelled') {
      trackingData.timeline.push({
        status: 'Pesanan Dibatalkan',
        date: booking.updatedAt,
        description: 'Pesanan Anda telah dibatalkan',
      });
    }

    return NextResponse.json({ success: true, data: trackingData });
  } catch (error) {
    console.error('Error tracking booking:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat melacak pesanan' },
      { status: 500 }
    );
  }
} 