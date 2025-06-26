import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Dapatkan total bookings
    const totalBookings = await prisma.booking.count();
    
    // Dapatkan booking berdasarkan status
    const pendingBookings = await prisma.booking.count({
      where: { status: 'pending' },
    });
    
    const confirmedBookings = await prisma.booking.count({
      where: { status: 'confirmed' },
    });
    
    const completedBookings = await prisma.booking.count({
      where: { status: 'completed' },
    });
    
    const cancelledBookings = await prisma.booking.count({
      where: { status: 'cancelled' },
    });
    
    // Dapatkan total contacts
    const totalContacts = await prisma.contact.count();
    
    // Dapatkan unread contacts
    const unreadContacts = await prisma.contact.count({
      where: { status: 'unread' },
    });
    
    // Kembalikan semua statistik
    return NextResponse.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalContacts,
        unreadContacts,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil statistik admin' },
      { status: 500 }
    );
  }
} 