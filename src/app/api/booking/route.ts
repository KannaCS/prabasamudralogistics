import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Fungsi untuk menghasilkan nomor booking unik
function generateBookingNumber() {
  const prefix = 'PSL';
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
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
        { error: 'Beberapa field wajib tidak diisi' },
        { status: 400 }
      );
    }

    // Generate nomor booking
    const bookingNumber = generateBookingNumber();

    // Simpan data booking ke database
    const booking = await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        company,
        serviceType,
        cargoType,
        origin,
        destination,
        shipmentDate: new Date(shipmentDate),
        weight: weight ? parseFloat(weight) : null,
        dimensions,
        specialInstructions,
        bookingNumber,
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
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: booking,
      bookingNumber 
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting booking form:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses booking' },
      { status: 500 }
    );
  }
} 