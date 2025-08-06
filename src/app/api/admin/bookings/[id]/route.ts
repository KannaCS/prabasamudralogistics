import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

// GET individual booking by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID diperlukan" },
        { status: 400 }
      );
    }

    // Get booking with all details
    const booking = await prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      {
        error: "Gagal mengambil data booking",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// PUT update booking details
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID diperlukan" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { status, ...updateData } = body;

    if (status) {
      const allowedStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          { error: "Status tidak valid" },
          { status: 400 }
        );
      }
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        ...updateData,
        status: status || undefined,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: "Booking berhasil diupdate"
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
      {
        error: "Gagal mengupdate booking",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE booking
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID diperlukan" },
        { status: 400 }
      );
    }

    // Delete booking
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
      {
        error: "Gagal menghapus booking",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 