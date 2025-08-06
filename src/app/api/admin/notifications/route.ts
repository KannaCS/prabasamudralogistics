import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get recent activities that could be notifications
    const [
      newBookings,
      unreadContacts,
      pendingBookings,
      recentBookings,
      recentContacts
    ] = await Promise.all([
      // New bookings in last 24 hours
      prisma.booking.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Unread contacts
      prisma.contact.count({
        where: { status: 'unread' }
      }),
      
      // Pending bookings
      prisma.booking.count({
        where: { status: 'pending' }
      }),
      
      // Recent bookings (last 5)
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        },
        select: {
          id: true,
          bookingNumber: true,
          fullName: true,
          serviceType: true,
          status: true,
          createdAt: true
        }
      }),
      
      // Recent contacts (last 5)
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        },
        select: {
          id: true,
          fullName: true,
          subject: true,
          status: true,
          createdAt: true
        }
      })
    ]);

    // Generate notifications
    const notifications = [];

    if (newBookings > 0) {
      notifications.push({
        id: 'new-bookings',
        type: 'info',
        title: 'Booking Baru',
        message: `${newBookings} booking baru dalam 24 jam terakhir`,
        count: newBookings,
        createdAt: new Date()
      });
    }

    if (unreadContacts > 0) {
      notifications.push({
        id: 'unread-contacts',
        type: 'warning',
        title: 'Pesan Belum Dibaca',
        message: `${unreadContacts} pesan belum dibaca`,
        count: unreadContacts,
        createdAt: new Date()
      });
    }

    if (pendingBookings > 0) {
      notifications.push({
        id: 'pending-bookings',
        type: 'warning',
        title: 'Booking Pending',
        message: `${pendingBookings} booking masih pending`,
        count: pendingBookings,
        createdAt: new Date()
      });
    }

    // Add recent activities as notifications
    recentBookings.forEach(booking => {
      notifications.push({
        id: `booking-${booking.id}`,
        type: 'info',
        title: 'Booking Baru',
        message: `Booking ${booking.bookingNumber} dari ${booking.fullName}`,
        data: booking,
        createdAt: booking.createdAt
      });
    });

    recentContacts.forEach(contact => {
      if (contact.status === 'unread') {
        notifications.push({
          id: `contact-${contact.id}`,
          type: 'warning',
          title: 'Pesan Baru',
          message: `Pesan dari ${contact.fullName}: ${contact.subject}`,
          data: contact,
          createdAt: contact.createdAt
        });
      }
    });

    // Sort by creation date (newest first)
    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({
      success: true,
      data: {
        notifications: notifications.slice(0, limit),
        summary: {
          newBookings,
          unreadContacts,
          pendingBookings,
          totalNotifications: notifications.length
        }
      }
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        error: "Gagal mengambil notifikasi",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 