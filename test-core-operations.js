const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCoreOperations() {
  console.log('🧪 Testing Core Database Operations...');
  
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
    // Test 1: Create and Read Contact
    console.log('\n1️⃣ Testing Contact Creation and Reading...');
    const contactData = {
      fullName: 'Test Core User',
      email: 'testcore@example.com',
      subject: 'Core Test Subject',
      message: 'This is a core test message'
    };
    
    const newContact = await prisma.contact.create({
      data: contactData
    });
    
    logTest('Create Contact', true, `Contact created with ID: ${newContact.id}`);
    
    const retrievedContact = await prisma.contact.findUnique({
      where: { id: newContact.id }
    });
    
    if (retrievedContact && retrievedContact.fullName === contactData.fullName) {
      logTest('Read Contact', true, `Contact retrieved: ${retrievedContact.fullName}`);
    } else {
      logTest('Read Contact', false, 'Failed to retrieve contact');
    }
    
    // Test 2: Create and Read Booking
    console.log('\n2️⃣ Testing Booking Creation and Reading...');
    const bookingNumber = `PSL${Date.now()}`;
    const bookingData = {
      fullName: 'Test Core Booking User',
      email: 'testcorebooking@example.com',
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
    
    // Test unique constraint
    try {
      await prisma.booking.create({
        data: {
          ...bookingData,
          fullName: 'Duplicate Test User',
          email: 'duplicate@example.com'
        }
      });
      logTest('Unique Constraint', false, 'Duplicate booking number was allowed');
    } catch (error) {
      if (error.code === 'P2002') {
        logTest('Unique Constraint', true, 'Booking number uniqueness enforced');
      } else {
        logTest('Unique Constraint', false, `Unexpected error: ${error.code}`);
      }
    }
    
    // Test 3: Read Booking by ID and booking number
    const retrievedById = await prisma.booking.findUnique({
      where: { id: newBooking.id }
    });
    
    const retrievedByNumber = await prisma.booking.findUnique({
      where: { bookingNumber }
    });
    
    if (retrievedById && retrievedByNumber && retrievedById.id === retrievedByNumber.id) {
      logTest('Booking Retrieval', true, `Booking found by both ID and number`);
    } else {
      logTest('Booking Retrieval', false, 'Failed to retrieve booking by ID or number');
    }
    
    // Test 4: List operations with pagination
    console.log('\n3️⃣ Testing List Operations...');
    const recentBookings = await prisma.booking.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    
    const recentContacts = await prisma.contact.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    
    if (recentBookings.length > 0 && recentContacts.length > 0) {
      logTest('List Operations', true, `Retrieved ${recentBookings.length} bookings and ${recentContacts.length} contacts`);
    } else {
      logTest('List Operations', false, 'Failed to retrieve records');
    }
    
    // Test 5: Count operations (for admin stats)
    console.log('\n4️⃣ Testing Count Operations...');
    const totalBookings = await prisma.booking.count();
    const totalContacts = await prisma.contact.count();
    const pendingBookings = await prisma.booking.count({
      where: { status: 'pending' }
    });
    const confirmedBookings = await prisma.booking.count({
      where: { status: 'confirmed' }
    });
    
    logTest('Count Operations', true, 
      `Total: ${totalBookings} bookings, ${totalContacts} contacts. ` +
      `Pending: ${pendingBookings}, Confirmed: ${confirmedBookings}`
    );
    
    // Test 6: Search functionality
    console.log('\n5️⃣ Testing Search Operations...');
    const searchResults = await prisma.booking.findMany({
      where: {
        OR: [
          { fullName: { contains: 'Test', mode: 'insensitive' } },
          { email: { contains: 'test', mode: 'insensitive' } },
          { origin: { contains: 'Jakarta', mode: 'insensitive' } }
        ]
      },
      take: 5
    });
    
    if (searchResults.length > 0) {
      logTest('Search Operations', true, `Search found ${searchResults.length} matching records`);
    } else {
      logTest('Search Operations', false, 'Search returned no results');
    }
    
    // Test 7: Filter by status
    console.log('\n6️⃣ Testing Status Filtering...');
    const pendingOnly = await prisma.booking.findMany({
      where: { status: 'pending' },
      take: 3
    });
    
    const confirmedOnly = await prisma.booking.findMany({
      where: { status: 'confirmed' },
      take: 3
    });
    
    logTest('Status Filtering', true, 
      `Filter results: ${pendingOnly.length} pending, ${confirmedOnly.length} confirmed`
    );
    
    // Test 8: Date range queries (useful for admin dashboard)
    console.log('\n7️⃣ Testing Date Range Queries...');
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentBookingsCount = await prisma.booking.count({
      where: {
        createdAt: {
          gte: oneWeekAgo
        }
      }
    });
    
    const recentContactsCount = await prisma.contact.count({
      where: {
        createdAt: {
          gte: oneWeekAgo
        }
      }
    });
    
    logTest('Date Range Queries', true, 
      `Last 7 days: ${recentBookingsCount} bookings, ${recentContactsCount} contacts`
    );
    
    // Test 9: Complex filtering (for admin interface)
    console.log('\n8️⃣ Testing Complex Filtering...');
    const complexFilter = await prisma.booking.findMany({
      where: {
        AND: [
          { serviceType: 'domestic-shipping' },
          {
            OR: [
              { status: 'pending' },
              { status: 'confirmed' }
            ]
          }
        ]
      },
      take: 5
    });
    
    logTest('Complex Filtering', true, 
      `Complex filter returned ${complexFilter.length} records`
    );
    
    // Test 10: Pagination simulation (important for admin interface)
    console.log('\n9️⃣ Testing Pagination...');
    const page1 = await prisma.booking.findMany({
      take: 2,
      skip: 0,
      orderBy: { createdAt: 'desc' }
    });
    
    const page2 = await prisma.booking.findMany({
      take: 2,
      skip: 2,
      orderBy: { createdAt: 'desc' }
    });
    
    // Ensure no overlap
    const page1Ids = page1.map(b => b.id);
    const page2Ids = page2.map(b => b.id);
    const hasOverlap = page1Ids.some(id => page2Ids.includes(id));
    
    if (!hasOverlap && page1.length > 0) {
      logTest('Pagination', true, `Page 1: ${page1.length} records, Page 2: ${page2.length} records, no overlap`);
    } else {
      logTest('Pagination', false, `Pagination issue: overlap detected or empty results`);
    }
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    await prisma.contact.delete({ where: { id: newContact.id } });
    await prisma.booking.delete({ where: { id: newBooking.id } });
    console.log('✅ Test data cleaned up');
    
  } catch (error) {
    console.error('❌ Core operations test failed:', error);
    logTest('General Test', false, `Unexpected error: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
  
  // Print summary
  console.log('\n📊 CORE OPERATIONS TEST SUMMARY:');
  console.log(`   Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`   Passed: ${testResults.passed}`);
  console.log(`   Failed: ${testResults.failed}`);
  console.log(`   Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`);
  
  // Save detailed results
  const fs = require('fs');
  fs.writeFileSync('core-operations-test-results.json', JSON.stringify(testResults, null, 2));
  console.log('📁 Detailed results saved to: core-operations-test-results.json');
  
  return testResults;
}

testCoreOperations()
  .then((results) => {
    if (results.failed > 0) {
      console.log('\n⚠️ Some core operations tests failed. Check the results for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All core database operations completed successfully!');
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error('❌ Core operations test execution failed:', error);
    process.exit(1);
  });