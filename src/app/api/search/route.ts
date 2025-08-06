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
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // 'all', 'bookings', 'contacts'
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Query pencarian minimal 2 karakter" },
        { status: 400 }
      );
    }

    const searchQuery = query.trim();
    const results: any = {
      bookings: [],
      contacts: [],
      total: 0
    };

    // Search in bookings
    if (type === 'all' || type === 'bookings') {
      const bookings = await prisma.booking.findMany({
        where: {
          OR: [
            { fullName: { contains: searchQuery, mode: 'insensitive' } },
            { email: { contains: searchQuery, mode: 'insensitive' } },
            { bookingNumber: { contains: searchQuery, mode: 'insensitive' } },
            { phone: { contains: searchQuery, mode: 'insensitive' } },
            { company: { contains: searchQuery, mode: 'insensitive' } },
            { origin: { contains: searchQuery, mode: 'insensitive' } },
            { destination: { contains: searchQuery, mode: 'insensitive' } },
            { serviceType: { contains: searchQuery, mode: 'insensitive' } },
            { cargoType: { contains: searchQuery, mode: 'insensitive' } }
          ]
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          bookingNumber: true,
          fullName: true,
          email: true,
          phone: true,
          company: true,
          serviceType: true,
          origin: true,
          destination: true,
          status: true,
          createdAt: true
        }
      });
      results.bookings = bookings;
    }

    // Search in contacts
    if (type === 'all' || type === 'contacts') {
      const contacts = await prisma.contact.findMany({
        where: {
          OR: [
            { fullName: { contains: searchQuery, mode: 'insensitive' } },
            { email: { contains: searchQuery, mode: 'insensitive' } },
            { subject: { contains: searchQuery, mode: 'insensitive' } },
            { message: { contains: searchQuery, mode: 'insensitive' } }
          ]
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          subject: true,
          status: true,
          createdAt: true
        }
      });
      results.contacts = contacts;
    }

    results.total = results.bookings.length + results.contacts.length;

    return NextResponse.json({
      success: true,
      data: {
        query: searchQuery,
        type: type || 'all',
        results,
        totalResults: results.total
      }
    });

  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json(
      {
        error: "Gagal melakukan pencarian",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 