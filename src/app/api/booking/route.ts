import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Fungsi untuk menghasilkan nomor booking unik
function generateBookingNumber() {
  const prefix = 'PSL';
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

// Fungsi validasi email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fungsi validasi nomor telepon
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      company,
      serviceType,
      cargoType,
      origin,
      destination,
      shipmentDate,
      weight,
      dimensions,
      specialInstructions,
      goodsType,
      hsCode,
      countryOrigin,
      countryDestination,
      lartas,
      proforma,
      exportImportType,
      portOfLoading,
      portOfDelivery,
      laycan,
      packingList,
      cargoPlan,
      cargo,
      distance,
      pic
    } = body;

    // Validasi data wajib
    if (!fullName || !email || !phone || !serviceType || !origin || !destination || !shipmentDate) {
      return NextResponse.json(
        {
          error: 'Beberapa field wajib tidak diisi',
          details: 'fullName, email, phone, serviceType, origin, destination, dan shipmentDate harus diisi'
        },
        { status: 400 }
      );
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Validasi format nomor telepon
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Format nomor telepon tidak valid' },
        { status: 400 }
      );
    }

    // Validasi tanggal pengiriman
    const shipmentDateObj = new Date(shipmentDate);
    if (isNaN(shipmentDateObj.getTime())) {
      return NextResponse.json(
        { error: 'Format tanggal pengiriman tidak valid' },
        { status: 400 }
      );
    }

    // Validasi tanggal tidak boleh di masa lalu
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (shipmentDateObj < today) {
      return NextResponse.json(
        { error: 'Tanggal pengiriman tidak boleh di masa lalu' },
        { status: 400 }
      );
    }

    // Generate nomor booking unik dengan retry mechanism
    let bookingNumber: string;
    let attempts = 0;
    const maxAttempts = 5;

    do {
      bookingNumber = generateBookingNumber();
      const existingBooking = await prisma.booking.findUnique({
        where: { bookingNumber }
      });
      
      if (!existingBooking) break;
      attempts++;
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: 'Gagal menghasilkan nomor booking unik' },
        { status: 500 }
      );
    }

    // Simpan data booking ke database
    const booking = await prisma.booking.create({
      data: {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company: company?.trim() || null,
        serviceType,
        cargoType: cargoType?.trim() || null,
        origin: origin.trim(),
        destination: destination.trim(),
        shipmentDate: shipmentDateObj,
        weight: weight ? parseFloat(weight) : null,
        dimensions: dimensions?.trim() || null,
        specialInstructions: specialInstructions?.trim() || null,
        bookingNumber,
        goodsType: goodsType?.trim() || null,
        hsCode: hsCode?.trim() || null,
        countryOrigin: countryOrigin?.trim() || null,
        countryDestination: countryDestination?.trim() || null,
        lartas: lartas?.trim() || null,
        proforma: proforma?.trim() || null,
        exportImportType: exportImportType?.trim() || null,
        portOfLoading: portOfLoading?.trim() || null,
        portOfDelivery: portOfDelivery?.trim() || null,
        laycan: laycan?.trim() || null,
        packingList: packingList?.trim() || null,
        cargoPlan: cargoPlan?.trim() || null,
        cargo: cargo?.trim() || null,
        distance: distance?.trim() || null,
        pic: pic?.trim() || null
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        fullName: booking.fullName,
        email: booking.email,
        serviceType: booking.serviceType,
        origin: booking.origin,
        destination: booking.destination,
        shipmentDate: booking.shipmentDate,
        status: booking.status,
        createdAt: booking.createdAt
      },
      message: 'Booking berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting booking form:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Nomor booking sudah ada, silakan coba lagi' },
          { status: 409 }
        );
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Data referensi tidak valid' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Terjadi kesalahan saat memproses booking',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// GET method untuk mengambil booking berdasarkan ID atau booking number
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const bookingNumber = searchParams.get('bookingNumber');

    if (!id && !bookingNumber) {
      return NextResponse.json(
        { error: 'Parameter id atau bookingNumber diperlukan' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: id ? { id } : { bookingNumber: bookingNumber! }
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data booking' },
      { status: 500 }
    );
  }
}