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
    const type = searchParams.get('type'); // 'bookings' or 'contacts'
    const format = searchParams.get('format') || 'json'; // 'json' or 'csv'
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!type || !['bookings', 'contacts'].includes(type)) {
      return NextResponse.json(
        { error: "Parameter type diperlukan (bookings atau contacts)" },
        { status: 400 }
      );
    }

    // Build date filter
    const dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    let data: any[] = [];

    if (type === 'bookings') {
      data = await prisma.booking.findMany({
        where: dateFilter,
        orderBy: { createdAt: 'desc' }
      });
    } else {
      data = await prisma.contact.findMany({
        where: dateFilter,
        orderBy: { createdAt: 'desc' }
      });
    }

    if (format === 'csv') {
      // Convert to CSV format
      const csvData = convertToCSV(data, type);
      
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${type}-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    // Return JSON format
    return NextResponse.json({
      success: true,
      data: {
        type,
        count: data.length,
        records: data,
        exportedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      {
        error: "Gagal mengexport data",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

function convertToCSV(data: any[], type: string): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Handle special characters and wrap in quotes if needed
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
} 