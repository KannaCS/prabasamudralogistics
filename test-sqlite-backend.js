const { PrismaClient } = require('@prisma/client');

async function testSQLiteBackend() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing SQLite backend integration...');
    
    // Test 1: Database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test 2: Create a test booking
    console.log('🔄 Testing booking creation...');
    const testBooking = await prisma.booking.create({
      data: {
        fullName: 'Test User SQLite',
        email: 'test.sqlite@example.com',
        phone: '+62812345678',
        company: 'Test Company SQLite',
        serviceType: 'domestic-shipping',
        cargoType: 'Test Cargo',
        origin: 'Jakarta SQLite Test',
        destination: 'Surabaya SQLite Test',
        shipmentDate: new Date(),
        weight: 1000,
        dimensions: '1m x 1m x 1m',
        specialInstructions: 'SQLite backend test',
        bookingNumber: `BK${Date.now()}`
      }
    });
    console.log(`✅ Booking created with ID: ${testBooking.id}`);
    
    // Test 3: Read the booking
    console.log('🔄 Testing booking retrieval...');
    const retrievedBooking = await prisma.booking.findUnique({
      where: { id: testBooking.id }
    });
    console.log(`✅ Booking retrieved: ${retrievedBooking.fullName}`);
    
    // Test 4: Create a test contact
    console.log('🔄 Testing contact creation...');
    const testContact = await prisma.contact.create({
      data: {
        fullName: 'Test Contact SQLite',
        email: 'contact.sqlite@example.com',
        subject: 'SQLite Backend Test',
        message: 'This is a test message for SQLite backend integration.'
      }
    });
    console.log(`✅ Contact created with ID: ${testContact.id}`);
    
    // Test 5: Get counts
    console.log('🔄 Testing data counts...');
    const bookingCount = await prisma.booking.count();
    const contactCount = await prisma.contact.count();
    console.log(`✅ Database contains ${bookingCount} bookings and ${contactCount} contacts`);
    
    // Test 6: Update booking status
    console.log('🔄 Testing data update...');
    const updatedBooking = await prisma.booking.update({
      where: { id: testBooking.id },
      data: { status: 'confirmed' }
    });
    console.log(`✅ Booking status updated to: ${updatedBooking.status}`);
    
    console.log('\n🎉 All SQLite backend tests passed successfully!');
    console.log('📊 Test Summary:');
    console.log(`   - Database connection: ✅`);
    console.log(`   - Booking CRUD operations: ✅`);
    console.log(`   - Contact creation: ✅`);
    console.log(`   - Data counting: ✅`);
    console.log(`   - Data updates: ✅`);
    
  } catch (error) {
    console.error('❌ SQLite backend test failed:');
    console.error('Error details:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed.');
  }
}

testSQLiteBackend();