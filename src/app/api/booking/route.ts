import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { 
  generateBookingNumber, 
  isValidEmail, 
  isValidPhone, 
  sanitizeInput,
  createErrorResponse,
  createSuccessResponse
} from '@/lib/utils';

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
        createErrorResponse(
          'Beberapa field wajib tidak diisi',
          400,
          'fullName, email, phone, serviceType, origin, destination, dan shipmentDate harus diisi'
        ),
        { status: 400 }
      );
    }

    // Validasi format email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        createErrorResponse('Format email tidak valid', 400),
        { status: 400 }
      );
    }

    // Validasi format nomor telepon
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        createErrorResponse('Format nomor telepon tidak valid', 400),
        { status: 400 }
      );
    }

    // Validasi tanggal pengiriman
    const shipmentDateObj = new Date(shipmentDate);
    if (isNaN(shipmentDateObj.getTime())) {
      return NextResponse.json(
        createErrorResponse('Format tanggal pengiriman tidak valid', 400),
        { status: 400 }
      );
    }

    // Validasi tanggal tidak boleh di masa lalu
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (shipmentDateObj < today) {
      return NextResponse.json(
        createErrorResponse('Tanggal pengiriman tidak boleh di masa lalu', 400),
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
        createErrorResponse('Gagal menghasilkan nomor booking unik', 500),
        { status: 500 }
      );
    }

    // Simpan data booking ke database
    const booking = await prisma.booking.create({
      data: {
        fullName: sanitizeInput(fullName, 100),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company: company ? sanitizeInput(company, 100) : null,
        serviceType,
        cargoType: cargoType ? sanitizeInput(cargoType, 100) : null,
        origin: sanitizeInput(origin, 200),
        destination: sanitizeInput(destination, 200),
        shipmentDate: shipmentDateObj,
        weight: weight ? parseFloat(weight) : null,
        dimensions: dimensions ? sanitizeInput(dimensions, 200) : null,
        specialInstructions: specialInstructions ? sanitizeInput(specialInstructions, 1000) : null,
        bookingNumber,
        goodsType: goodsType ? sanitizeInput(goodsType, 100) : null,
        hsCode: hsCode ? sanitizeInput(hsCode, 50) : null,
        countryOrigin: countryOrigin ? sanitizeInput(countryOrigin, 100) : null,
        countryDestination: countryDestination ? sanitizeInput(countryDestination, 100) : null,
        lartas: lartas ? sanitizeInput(lartas, 100) : null,
        proforma: proforma ? sanitizeInput(proforma, 100) : null,
        exportImportType: exportImportType ? sanitizeInput(exportImportType, 50) : null,
        portOfLoading: portOfLoading ? sanitizeInput(portOfLoading, 100) : null,
        portOfDelivery: portOfDelivery ? sanitizeInput(portOfDelivery, 100) : null,
        laycan: laycan ? sanitizeInput(laycan, 100) : null,
        packingList: packingList ? sanitizeInput(packingList, 200) : null,
        cargoPlan: cargoPlan ? sanitizeInput(cargoPlan, 200) : null,
        cargo: cargo ? sanitizeInput(cargo, 200) : null,
        distance: distance ? sanitizeInput(distance, 100) : null,
        pic: pic ? sanitizeInput(pic, 100) : null
      },
    });

    return NextResponse.json(
      createSuccessResponse({
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
      }, 'Booking berhasil dibuat'),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting booking form:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          createErrorResponse('Nomor booking sudah ada, silakan coba lagi', 409),
          { status: 409 }
        );
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          createErrorResponse('Data referensi tidak valid', 400),
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      createErrorResponse('Terjadi kesalahan saat memproses booking', 500, error),
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