import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { emailService } from "@/lib/email";

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
    const { testType } = body;

    let result;

    switch (testType) {
      case 'connection':
        // Test SMTP connection
        result = await emailService.testConnection();
        break;
      
      case 'booking':
        // Test booking notification email
        const testBooking = {
          bookingNumber: 'PSL202400001',
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '+62812345678',
          company: 'Test Company',
          serviceType: 'domestic-shipping',
          origin: 'Jakarta',
          destination: 'Surabaya',
          shipmentDate: new Date(),
          weight: 1000,
          dimensions: '2m x 1m x 1m',
          specialInstructions: 'Test booking for email notification'
        };
        result = await emailService.sendNewBookingNotification(testBooking);
        break;
      
      case 'contact':
        // Test contact notification email
        const testContact = {
          fullName: 'Test Contact',
          email: 'contact@example.com',
          subject: 'Test Contact Message',
          message: 'This is a test contact message for email notification testing.'
        };
        result = await emailService.sendNewContactNotification(testContact);
        break;
      
      default:
        return NextResponse.json(
          { error: "Test type tidak valid. Gunakan: connection, booking, atau contact" },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email test ${testType} berhasil`,
        data: result
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Email test ${testType} gagal`,
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Error testing email:", error);
    return NextResponse.json(
      {
        error: "Gagal melakukan test email",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 