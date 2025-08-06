import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Sample booking data
  const sampleBookings = [
    {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+62812345678',
      company: 'PT. Example Company',
      serviceType: 'domestic-shipping',
      cargoType: 'General Cargo',
      origin: 'Jakarta',
      destination: 'Surabaya',
      shipmentDate: new Date('2024-08-15'),
      weight: 1500.5,
      dimensions: '2m x 1.5m x 1m',
      specialInstructions: 'Handle with care - fragile items',
      bookingNumber: 'PSL202408001',
      status: 'confirmed'
    },
    {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+62823456789',
      company: 'CV. Logistics Indonesia',
      serviceType: 'export-import',
      cargoType: 'Container',
      origin: 'Tanjung Priok',
      destination: 'Singapore',
      shipmentDate: new Date('2024-08-20'),
      weight: 25000,
      dimensions: '20ft Container',
      specialInstructions: 'Temperature controlled cargo',
      bookingNumber: 'PSL202408002',
      status: 'processing',
      goodsType: 'Electronics',
      hsCode: '8517.12.00',
      countryOrigin: 'Indonesia',
      countryDestination: 'Singapore',
      exportImportType: 'Export'
    },
    {
      fullName: 'Ahmad Rahman',
      email: 'ahmad.rahman@example.com',
      phone: '+62834567890',
      serviceType: 'truck-rental',
      origin: 'Bandung',
      destination: 'Yogyakarta',
      shipmentDate: new Date('2024-08-10'),
      weight: 5000,
      dimensions: 'Truck Load',
      bookingNumber: 'PSL202408003',
      status: 'completed'
    },
    {
      fullName: 'Maria Santos',
      email: 'maria.santos@example.com',
      phone: '+62845678901',
      company: 'Santos Trading',
      serviceType: 'roro-shipping',
      cargoType: 'Vehicles',
      origin: 'Merak',
      destination: 'Bakauheni',
      shipmentDate: new Date('2024-08-25'),
      weight: 15000,
      dimensions: '5 vehicles',
      specialInstructions: 'Vehicle transport - cars and motorcycles',
      bookingNumber: 'PSL202408004',
      status: 'pending'
    },
    {
      fullName: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '+62856789012',
      serviceType: 'freight-forwarding',
      cargoType: 'Mixed Cargo',
      origin: 'Semarang',
      destination: 'Makassar',
      shipmentDate: new Date('2024-08-18'),
      weight: 8500,
      dimensions: 'Multiple packages',
      bookingNumber: 'PSL202408005',
      status: 'shipped'
    }
  ];

  // Sample contact data
  const sampleContacts = [
    {
      fullName: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      subject: 'Inquiry about shipping rates',
      message: 'Hello, I would like to know about your shipping rates from Jakarta to Bali for general cargo. Please provide me with a quotation.',
      status: 'unread'
    },
    {
      fullName: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      subject: 'Container shipping to Malaysia',
      message: 'I need to ship a 40ft container from Surabaya to Kuala Lumpur. What are your rates and transit times?',
      status: 'read'
    },
    {
      fullName: 'Michael Brown',
      email: 'michael.brown@example.com',
      subject: 'Truck rental availability',
      message: 'Do you have trucks available for rent next week? I need to transport goods from Medan to Padang.',
      status: 'replied'
    },
    {
      fullName: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      subject: 'Export documentation assistance',
      message: 'I need help with export documentation for shipping electronics to Thailand. Can you assist with customs clearance?',
      status: 'unread'
    },
    {
      fullName: 'Kevin Lee',
      email: 'kevin.lee@example.com',
      subject: 'Vehicle shipping inquiry',
      message: 'I want to ship my car from Jakarta to Denpasar. What is the process and cost involved?',
      status: 'read'
    }
  ];

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.contact.deleteMany();
    await prisma.booking.deleteMany();

    // Seed bookings
    console.log('📦 Seeding bookings...');
    for (const booking of sampleBookings) {
      await prisma.booking.create({
        data: booking
      });
    }
    console.log(`✅ Created ${sampleBookings.length} sample bookings`);

    // Seed contacts
    console.log('📧 Seeding contacts...');
    for (const contact of sampleContacts) {
      await prisma.contact.create({
        data: contact
      });
    }
    console.log(`✅ Created ${sampleContacts.length} sample contacts`);

    // Display summary
    const totalBookings = await prisma.booking.count();
    const totalContacts = await prisma.contact.count();
    
    console.log('\n📊 Seeding Summary:');
    console.log(`   📦 Total Bookings: ${totalBookings}`);
    console.log(`   📧 Total Contacts: ${totalContacts}`);
    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });