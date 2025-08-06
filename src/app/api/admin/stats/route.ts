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

    // Get current date ranges
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Get booking statistics
    const [
      totalBookings,
      todayBookings,
      weekBookings,
      monthBookings,
      yearBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalContacts,
      unreadContacts,
      recentBookings,
      recentContacts,
      bookingsByService,
      bookingsByStatus,
      monthlyBookings
    ] = await Promise.all([
      // Total bookings
      prisma.booking.count(),
      
      // Today's bookings
      prisma.booking.count({
        where: { createdAt: { gte: startOfToday } }
      }),
      
      // This week's bookings
      prisma.booking.count({
        where: { createdAt: { gte: startOfWeek } }
      }),
      
      // This month's bookings
      prisma.booking.count({
        where: { createdAt: { gte: startOfMonth } }
      }),
      
      // This year's bookings
      prisma.booking.count({
        where: { createdAt: { gte: startOfYear } }
      }),
      
      // Bookings by status
      prisma.booking.count({
        where: { status: 'pending' }
      }),
      
      prisma.booking.count({
        where: { status: 'confirmed' }
      }),
      
      prisma.booking.count({
        where: { status: 'completed' }
      }),
      
      prisma.booking.count({
        where: { status: 'cancelled' }
      }),
      
      // Total contacts
      prisma.contact.count(),
      
      // Unread contacts
      prisma.contact.count({
        where: { status: 'unread' }
      }),
      
      // Recent bookings (last 5)
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
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
        select: {
          id: true,
          fullName: true,
          subject: true,
          status: true,
          createdAt: true
        }
      }),
      
      // Bookings by service type
      prisma.booking.groupBy({
        by: ['serviceType'],
        _count: {
          serviceType: true
        }
      }),
      
      // Bookings by status
      prisma.booking.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      
      // Monthly bookings for the current year
      prisma.booking.findMany({
        where: {
          createdAt: { gte: startOfYear }
        },
        select: {
          createdAt: true
        }
      })
    ]);

    // Process monthly data
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const count = monthlyBookings.filter(booking => 
        booking.createdAt.getMonth() + 1 === month
      ).length;
      
      return {
        month: new Date(now.getFullYear(), i, 1).toLocaleString('default', { month: 'short' }),
        bookings: count
      };
    });

    // Calculate growth rates
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const lastMonthBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd
        }
      }
    });

    const bookingGrowthRate = lastMonthBookings > 0 
      ? ((monthBookings - lastMonthBookings) / lastMonthBookings * 100).toFixed(1)
      : '0';

    const stats = {
      overview: {
        totalBookings,
        totalContacts,
        todayBookings,
        weekBookings,
        monthBookings,
        yearBookings,
        unreadContacts,
        bookingGrowthRate: parseFloat(bookingGrowthRate)
      },
      bookingsByStatus: {
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings
      },
      bookingsByService: bookingsByService.map(item => ({
        service: item.serviceType,
        count: item._count.serviceType
      })),
      statusDistribution: bookingsByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      monthlyTrend: monthlyData,
      recentActivity: {
        bookings: recentBookings,
        contacts: recentContacts
      }
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch statistics",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}