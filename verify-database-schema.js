const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyDatabaseSchema() {
  console.log('🔍 Verifying database schema...');
  
  try {
    // Test basic queries to see what fields exist
    console.log('\n1️⃣ Testing Contact table structure...');
    
    // Get the first contact record to see actual fields
    const contact = await prisma.contact.findFirst();
    if (contact) {
      console.log('✅ Contact record found. Fields:');
      console.log(Object.keys(contact));
    } else {
      console.log('ℹ️ No contact records found, checking with raw query...');
    }
    
    console.log('\n2️⃣ Testing Booking table structure...');
    const booking = await prisma.booking.findFirst();
    if (booking) {
      console.log('✅ Booking record found. Fields:');
      console.log(Object.keys(booking));
    } else {
      console.log('ℹ️ No booking records found, checking with raw query...');
    }
    
    // Try to get table information using raw SQL
    console.log('\n3️⃣ Getting table information...');
    
    const contactColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'Contact' 
      ORDER BY ordinal_position;
    `;
    
    console.log('Contact table columns:');
    console.table(contactColumns);
    
    const bookingColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'Booking' 
      ORDER BY ordinal_position;
    `;
    
    console.log('Booking table columns:');
    console.table(bookingColumns);
    
  } catch (error) {
    console.error('❌ Schema verification failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabaseSchema();