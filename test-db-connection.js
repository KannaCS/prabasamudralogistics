const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test if tables exist and are accessible
    console.log('🔄 Testing table access...');
    
    const bookingCount = await prisma.booking.count();
    console.log(`📊 Booking table: ${bookingCount} records found`);
    
    const contactCount = await prisma.contact.count();
    console.log(`📧 Contact table: ${contactCount} records found`);
    
    console.log('✅ All database operations working correctly!');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
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

testDatabaseConnection();