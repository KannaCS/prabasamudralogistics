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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validasi parameter
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Build where clause
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { bookingNumber: { contains: search, mode: 'insensitive' } },
        { origin: { contains: search, mode: 'insensitive' } },
        { destination: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get total count
    const totalCount = await prisma.booking.count({ where });
    
    // Get bookings with pagination
    const bookings = await prisma.booking.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
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
        shipmentDate: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch bookings",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// PUT method untuk update status booking
export async function PUT(request: Request) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status diperlukan" },
        { status: 400 }
      );
    }

    // Validasi status
    const allowedStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: "Status booking berhasil diupdate"
    });

  } catch (error) {
    console.error("Error updating booking:", error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Gagal mengupdate booking" },
      { status: 500 }
    );
  }
}

// DELETE method untuk menghapus booking
export async function DELETE(request: Request) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID booking diperlukan" },
        { status: 400 }
      );
    }

    // Hapus booking
    await prisma.booking.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Booking berhasil dihapus"
    });

  } catch (error) {
    console.error("Error deleting booking:", error);
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Gagal menghapus booking" },
      { status: 500 }
    );
  }
}