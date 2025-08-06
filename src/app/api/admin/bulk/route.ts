import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Verifikasi token admin
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, type, ids, status } = body;

    if (!action || !type || !ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Parameter action, type, dan ids diperlukan" },
        { status: 400 }
      );
    }

    if (!['update', 'delete'].includes(action)) {
      return NextResponse.json(
        { error: "Action tidak valid (update atau delete)" },
        { status: 400 }
      );
    }

    if (!['bookings', 'contacts'].includes(type)) {
      return NextResponse.json(
        { error: "Type tidak valid (bookings atau contacts)" },
        { status: 400 }
      );
    }

    let result: any;

    if (action === 'update') {
      if (!status) {
        return NextResponse.json(
          { error: "Status diperlukan untuk update action" },
          { status: 400 }
        );
      }

      // Validate status based on type
      if (type === 'bookings') {
        const allowedStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
          return NextResponse.json(
            { error: "Status booking tidak valid" },
            { status: 400 }
          );
        }
      } else {
        const allowedStatuses = ['unread', 'read', 'replied'];
        if (!allowedStatuses.includes(status)) {
          return NextResponse.json(
            { error: "Status contact tidak valid" },
            { status: 400 }
          );
        }
      }

      // Bulk update
      if (type === 'bookings') {
        result = await prisma.booking.updateMany({
          where: { id: { in: ids } },
          data: { 
            status,
            updatedAt: new Date()
          }
        });
      } else {
        result = await prisma.contact.updateMany({
          where: { id: { in: ids } },
          data: { 
            status,
            updatedAt: new Date()
          }
        });
      }
    } else {
      // Bulk delete
      if (type === 'bookings') {
        result = await prisma.booking.deleteMany({
          where: { id: { in: ids } }
        });
      } else {
        result = await prisma.contact.deleteMany({
          where: { id: { in: ids } }
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        action,
        type,
        processedCount: result.count,
        totalRequested: ids.length
      },
      message: `Bulk ${action} berhasil dilakukan`
    });

  } catch (error) {
    console.error("Error performing bulk operation:", error);
    return NextResponse.json(
      {
        error: "Gagal melakukan bulk operation",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 