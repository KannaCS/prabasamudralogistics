// Verify Schema Deployment Script
// This script checks that the Booking and Contact tables were created successfully in Supabase

const { PrismaClient } = require('@prisma/client');

async function verifySchema() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔍 Verifying database schema deployment...\n');
        
        // Test 1: Check if we can connect to the database
        console.log('✅ Testing database connection...');
        await prisma.$connect();
        console.log('✅ Database connection successful!\n');
        
        // Test 2: Check if Booking table exists and get its structure
        console.log('📋 Verifying Booking table...');
        try {
            const bookingCount = await prisma.booking.count();
            console.log(`✅ Booking table exists (current records: ${bookingCount})`);
            
            // Check if we can create a sample booking (then delete it)
            const testBooking = await prisma.booking.create({
                data: {
                    fullName: 'Test User',
                    email: 'test@example.com',
                    phone: '+1234567890',
                    serviceType: 'domestic-shipping',
                    origin: 'Jakarta',
                    destination: 'Surabaya',
                    shipmentDate: new Date(),
                    bookingNumber: `TEST-${Date.now()}`
                }
            });
            console.log('✅ Booking table write test successful');
            
            // Clean up test data
            await prisma.booking.delete({
                where: { id: testBooking.id }
            });
            console.log('✅ Booking table cleanup successful\n');
            
        } catch (error) {
            console.error('❌ Booking table verification failed:', error.message);
        }
        
        // Test 3: Check if Contact table exists and get its structure
        console.log('📧 Verifying Contact table...');
        try {
            const contactCount = await prisma.contact.count();
            console.log(`✅ Contact table exists (current records: ${contactCount})`);
            
            // Check if we can create a sample contact (then delete it)
            const testContact = await prisma.contact.create({
                data: {
                    fullName: 'Test Contact',
                    email: 'contact@example.com',
                    subject: 'Test Subject',
                    message: 'Test message for schema verification'
                }
            });
            console.log('✅ Contact table write test successful');
            
            // Clean up test data
            await prisma.contact.delete({
                where: { id: testContact.id }
            });
            console.log('✅ Contact table cleanup successful\n');
            
        } catch (error) {
            console.error('❌ Contact table verification failed:', error.message);
        }
        
        // Test 4: Verify UUID generation works
        console.log('🔑 Testing UUID generation...');
        const testRecord = await prisma.booking.create({
            data: {
                fullName: 'UUID Test',
                email: 'uuid@example.com',
                phone: '+1234567890',
                serviceType: 'test',
                origin: 'Test Origin',
                destination: 'Test Destination',
                shipmentDate: new Date(),
                bookingNumber: `UUID-TEST-${Date.now()}`
            }
        });
        
        if (testRecord.id && testRecord.id.length === 36) {
            console.log('✅ UUID generation working correctly');
            console.log(`   Generated UUID: ${testRecord.id}`);
        } else {
            console.log('❌ UUID generation may have issues');
        }
        
        // Clean up
        await prisma.booking.delete({
            where: { id: testRecord.id }
        });
        console.log('✅ UUID test cleanup successful\n');
        
        console.log('🎉 Schema verification completed successfully!');
        console.log('\n📝 Next Steps:');
        console.log('1. Execute the SQL triggers in your Supabase dashboard');
        console.log('2. Go to: Project Dashboard → SQL Editor');
        console.log('3. Copy and paste the content from supabase-triggers.sql');
        console.log('4. Run the SQL to create the updatedAt triggers');
        
    } catch (error) {
        console.error('❌ Schema verification failed:', error);
        console.error('\nPlease check:');
        console.error('1. Database connection string is correct');
        console.error('2. Database credentials are valid');
        console.error('3. Migration was applied successfully');
    } finally {
        await prisma.$disconnect();
    }
}

// Run the verification
verifySchema();