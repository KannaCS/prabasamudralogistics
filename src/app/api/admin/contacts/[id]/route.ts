import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

// GET individual contact by ID
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
        { error: "Contact ID diperlukan" },
        { status: 400 }
      );
    }

    // Get contact with all details
    const contact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      {
        error: "Gagal mengambil data contact",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// PUT update contact details
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
        { error: "Contact ID diperlukan" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { status, ...updateData } = body;

    if (status) {
      const allowedStatuses = ['unread', 'read', 'replied'];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          { error: "Status tidak valid" },
          { status: 400 }
        );
      }
    }

    // Update contact
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        ...updateData,
        status: status || undefined,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedContact,
      message: "Contact berhasil diupdate"
    });

  } catch (error) {
    console.error("Error updating contact:", error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: "Contact tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Gagal mengupdate contact",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE contact
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
        { error: "Contact ID diperlukan" },
        { status: 400 }
      );
    }

    // Delete contact
    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Contact berhasil dihapus"
    });

  } catch (error) {
    console.error("Error deleting contact:", error);
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: "Contact tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Gagal menghapus contact",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 