const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCRUDOperations() {
  console.log('🧪 Testing CRUD operations with Supabase...');
  
  let testResults = {
    passed: 0,
    failed: 0,
    tests: []
  };

  function logTest(testName, success, details = '') {
    const result = {
      test: testName,
      status: success ? 'PASS' : 'FAIL',
      details,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    
    if (success) {
      testResults.passed++;
      console.log(`✅ ${testName}: ${details}`);
    } else {
      testResults.failed++;
      console.log(`❌ ${testName}: ${details}`);
    }
  }

  try {
    // Test 1: Create Contact
    console.log('\n1️⃣ Testing Contact Creation...');
    const contactData = {
      fullName: 'Test CRUD User',
      email: 'testcrud@example.com',
      subject: 'CRUD Test Subject',
      message: 'This is a CRUD test message'
    };
    
    const newContact = await prisma.contact.create({
      data: contactData
    });
    
    logTest('Create Contact', true, `Contact created with ID: ${newContact.id}`);
    
    // Test 2: Read Contact
    console.log('\n2️⃣ Testing Contact Reading...');
    const retrievedContact = await prisma.contact.findUnique({
      where: { id: newContact.id }
    });
    
    if (retrievedContact && retrievedContact.fullName === contactData.fullName) {
      logTest('Read Contact', true, `Contact retrieved: ${retrievedContact.fullName}`);
    } else {
      logTest('Read Contact', false, 'Failed to retrieve contact or data mismatch');
    }
    
    // Test 3: Update Contact
    console.log('\n3️⃣ Testing Contact Update...');
    const updatedContact = await prisma.contact.update({
      where: { id: newContact.id },
      data: { status: 'read' }
    });
    
    if (updatedContact.status === 'read') {
      logTest('Update Contact', true, `Contact status updated to: ${updatedContact.status}`);
    } else {
      logTest('Update Contact', false, 'Failed to update contact status');
    }
    
    // Test 4: Create Booking
    console.log('\n4️⃣ Testing Booking Creation...');
    const bookingNumber = `PSL${Date.now()}`;
    const bookingData = {
      fullName: 'Test CRUD Booking User',
      email: 'testcrudbooking@example.com',
      phone: '+621234567890',
      serviceType: 'domestic-shipping',
      origin: 'Jakarta Test',
      destination: 'Surabaya Test',
      shipmentDate: new Date(),
      bookingNumber
    };
    
    const newBooking = await prisma.booking.create({
      data: bookingData
    });
    
    logTest('Create Booking', true, `Booking created: ${newBooking.bookingNumber}`);
    
    // Test 5: Read Booking by ID
    console.log('\n5️⃣ Testing Booking Reading by ID...');
    const retrievedBooking = await prisma.booking.findUnique({
      where: { id: newBooking.id }
    });
    
    if (retrievedBooking && retrievedBooking.bookingNumber === bookingNumber) {
      logTest('Read Booking by ID', true, `Booking retrieved: ${retrievedBooking.bookingNumber}`);
    } else {
      logTest('Read Booking by ID', false, 'Failed to retrieve booking or data mismatch');
    }
    
    // Test 6: Read Booking by Booking Number
    console.log('\n6️⃣ Testing Booking Reading by Booking Number...');
    const retrievedByNumber = await prisma.booking.findUnique({
      where: { bookingNumber }
    });
    
    if (retrievedByNumber && retrievedByNumber.id === newBooking.id) {
      logTest('Read Booking by Number', true, `Booking found: ${retrievedByNumber.bookingNumber}`);
    } else {
      logTest('Read Booking by Number', false, 'Failed to retrieve booking by booking number');
    }
    
    // Test 7: Update Booking Status
    console.log('\n7️⃣ Testing Booking Status Update...');
    const updatedBooking = await prisma.booking.update({
      where: { id: newBooking.id },
      data: { status: 'confirmed' }
    });
    
    if (updatedBooking.status === 'confirmed') {
      logTest('Update Booking Status', true, `Booking status updated to: ${updatedBooking.status}`);
    } else {
      logTest('Update Booking Status', false, 'Failed to update booking status');
    }
    
    // Test 8: Test Unique Constraint (Booking Number)
    console.log('\n8️⃣ Testing Unique Constraint...');
    try {
      await prisma.booking.create({
        data: {
          ...bookingData,
          fullName: 'Duplicate Test',
          email: 'duplicate@example.com'
          // Same bookingNumber should cause unique constraint violation
        }
      });
      logTest('Unique Constraint', false, 'Unique constraint not working - duplicate allowed');
    } catch (error) {
      if (error.code === 'P2002') {
        logTest('Unique Constraint', true, 'Unique constraint working - duplicate prevented');
      } else {
        logTest('Unique Constraint', false, `Unexpected error: ${error.message}`);
      }
    }
    
    // Test 9: List Operations (Admin functionality)
    console.log('\n9️⃣ Testing List Operations...');
    const allBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    
    const allContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    
    if (allBookings.length > 0 && allContacts.length > 0) {
      logTest('List Operations', true, `Found ${allBookings.length} bookings and ${allContacts.length} contacts`);
    } else {
      logTest('List Operations', false, 'Failed to retrieve lists');
    }
    
    // Test 10: Counting for Statistics
    console.log('\n🔟 Testing Count Operations...');
    const totalBookings = await prisma.booking.count();
    const totalContacts = await prisma.contact.count();
    const pendingBookings = await prisma.booking.count({
      where: { status: 'pending' }
    });
    
    logTest('Count Operations', true, `Stats: ${totalBookings} bookings, ${totalContacts} contacts, ${pendingBookings} pending`);
    
    // Test 11: Search Functionality
    console.log('\n1️⃣1️⃣ Testing Search Operations...');
    const searchResults = await prisma.booking.findMany({
      where: {
        OR: [
          { fullName: { contains: 'Test', mode: 'insensitive' } },
          { email: { contains: 'test', mode: 'insensitive' } }
        ]
      },
      take: 3
    });
    
    if (searchResults.length > 0) {
      logTest('Search Operations', true, `Search found ${searchResults.length} matching records`);
    } else {
      logTest('Search Operations', false, 'Search functionality not working');
    }
    
    // Test 12: Test updatedAt functionality
    console.log('\n1️⃣2️⃣ Testing Timestamp Updates...');
    const originalUpdatedAt = updatedBooking.updatedAt;
    
    // Wait a moment and update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const timestampTest = await prisma.booking.update({
      where: { id: newBooking.id },
      data: { weight: 1500.5 }
    });
    
    if (new Date(timestampTest.updatedAt) > new Date(originalUpdatedAt)) {
      logTest('Timestamp Updates', true, 'updatedAt field working correctly');
    } else {
      logTest('Timestamp Updates', false, 'updatedAt field not updating properly');
    }
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    await prisma.contact.delete({ where: { id: newContact.id } });
    await prisma.booking.delete({ where: { id: newBooking.id } });
    console.log('✅ Test data cleaned up');
    
  } catch (error) {
    console.error('❌ CRUD test failed:', error);
    logTest('General CRUD Test', false, `Unexpected error: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
  
  // Print summary
  console.log('\n📊 CRUD TEST SUMMARY:');
  console.log(`   Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`   Passed: ${testResults.passed}`);
  console.log(`   Failed: ${testResults.failed}`);
  console.log(`   Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`);
  
  // Save detailed results
  const fs = require('fs');
  fs.writeFileSync('crud-test-results.json', JSON.stringify(testResults, null, 2));
  console.log('📁 Detailed results saved to: crud-test-results.json');
  
  return testResults;
}

testCRUDOperations()
  .then((results) => {
    if (results.failed > 0) {
      console.log('\n⚠️ Some CRUD tests failed. Check the results for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All CRUD operations completed successfully!');
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error('❌ CRUD test execution failed:', error);
    process.exit(1);
  });