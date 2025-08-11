const fs = require('fs');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Test results storage
let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    return {
      status: response.status,
      statusText: response.statusText,
      data,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

// Helper function to log test results
function logTest(testName, success, details = '', response = null) {
  const result = {
    test: testName,
    status: success ? 'PASS' : 'FAIL',
    details,
    timestamp: new Date().toISOString(),
    response: response ? {
      status: response.status,
      data: typeof response.data === 'string' ? response.data.substring(0, 200) : response.data
    } : null
  };

  testResults.tests.push(result);
  
  if (success) {
    testResults.passed++;
    console.log(`✅ ${testName}: ${details}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}: ${details}`);
    if (response) {
      console.log(`   Status: ${response.status}, Response: ${JSON.stringify(response.data).substring(0, 100)}`);
    }
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🔍 Testing application health...');
  try {
    const response = await makeRequest(BASE_URL);
    logTest('Application Health Check', response.status === 200, `Server responding with status ${response.status}`, response);
  } catch (error) {
    logTest('Application Health Check', false, `Failed to connect: ${error.message}`);
  }
}

async function testCreateBooking() {
  console.log('\n📦 Testing POST /api/booking...');
  
  const bookingData = {
    fullName: 'Test User API',
    email: 'testapi@example.com',
    phone: '+62812345678',
    company: 'Test Company API',
    serviceType: 'domestic-shipping',
    cargoType: 'Test Cargo',
    origin: 'Jakarta Test',
    destination: 'Surabaya Test',
    shipmentDate: new Date().toISOString(),
    weight: 1000,
    dimensions: '1m x 1m x 1m',
    specialInstructions: 'API Test booking'
  };

  try {
    const response = await makeRequest(`${BASE_URL}/api/booking`, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });

    if (response.status === 201 && response.data.success) {
      logTest('Create Booking', true, `Booking created with ID: ${response.data.booking.id}`, response);
      return response.data.booking;
    } else {
      logTest('Create Booking', false, `Unexpected response`, response);
    }
  } catch (error) {
    logTest('Create Booking', false, `Request failed: ${error.message}`);
  }
  return null;
}

async function testGetBooking(bookingId) {
  console.log('\n🔍 Testing GET /api/booking...');
  
  if (!bookingId) {
    logTest('Get Booking', false, 'No booking ID provided from previous test');
    return;
  }

  try {
    const response = await makeRequest(`${BASE_URL}/api/booking?id=${bookingId}`);
    
    if (response.status === 200 && response.data.success && response.data.booking) {
      logTest('Get Booking', true, `Retrieved booking: ${response.data.booking.fullName}`, response);
    } else {
      logTest('Get Booking', false, `Failed to retrieve booking`, response);
    }
  } catch (error) {
    logTest('Get Booking', false, `Request failed: ${error.message}`);
  }
}

async function testCreateContact() {
  console.log('\n📧 Testing POST /api/contact...');
  
  const contactData = {
    fullName: 'Test Contact API',
    email: 'testcontact@example.com',
    subject: 'API Test Contact',
    message: 'This is a test message created via API testing.'
  };

  try {
    const response = await makeRequest(`${BASE_URL}/api/contact`, {
      method: 'POST',
      body: JSON.stringify(contactData)
    });

    if (response.status === 201 && response.data.success) {
      logTest('Create Contact', true, `Contact created with ID: ${response.data.contact.id}`, response);
      return response.data.contact;
    } else {
      logTest('Create Contact', false, `Unexpected response`, response);
    }
  } catch (error) {
    logTest('Create Contact', false, `Request failed: ${error.message}`);
  }
  return null;
}

async function getAuthToken() {
  console.log('\n🔐 Getting admin authentication token...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify(ADMIN_CREDENTIALS)
    });

    if (response.status === 200 && response.data.success) {
      logTest('Admin Login', true, 'Successfully authenticated', response);
      return response.data.token;
    } else {
      logTest('Admin Login', false, 'Authentication failed', response);
    }
  } catch (error) {
    logTest('Admin Login', false, `Request failed: ${error.message}`);
  }
  return null;
}

async function testAdminBookings(token) {
  console.log('\n📋 Testing GET /api/admin/bookings...');
  
  if (!token) {
    logTest('Admin Bookings', false, 'No auth token available');
    return;
  }

  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.success) {
      logTest('Admin Bookings', true, `Retrieved ${response.data.bookings.length} bookings`, response);
    } else {
      logTest('Admin Bookings', false, `Failed to retrieve bookings`, response);
    }
  } catch (error) {
    logTest('Admin Bookings', false, `Request failed: ${error.message}`);
  }
}

async function testAdminContacts(token) {
  console.log('\n📬 Testing GET /api/admin/contacts...');
  
  if (!token) {
    logTest('Admin Contacts', false, 'No auth token available');
    return;
  }

  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/contacts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.success) {
      logTest('Admin Contacts', true, `Retrieved ${response.data.contacts.length} contacts`, response);
    } else {
      logTest('Admin Contacts', false, `Failed to retrieve contacts`, response);
    }
  } catch (error) {
    logTest('Admin Contacts', false, `Request failed: ${error.message}`);
  }
}

async function testAdminStats(token) {
  console.log('\n📊 Testing GET /api/admin/stats...');
  
  if (!token) {
    logTest('Admin Stats', false, 'No auth token available');
    return;
  }

  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.success) {
      const stats = response.data.stats;
      logTest('Admin Stats', true, `Stats: ${stats.totalBookings} bookings, ${stats.totalContacts} contacts`, response);
    } else {
      logTest('Admin Stats', false, `Failed to retrieve stats`, response);
    }
  } catch (error) {
    logTest('Admin Stats', false, `Request failed: ${error.message}`);
  }
}

async function testAdvancedFeatures(token) {
  console.log('\n🔍 Testing advanced features...');
  
  if (!token) {
    logTest('Advanced Features', false, 'No auth token available');
    return;
  }

  // Test pagination
  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/bookings?page=1&limit=2`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.success) {
      logTest('Pagination Test', true, `Pagination working, got ${response.data.bookings.length} records`, response);
    } else {
      logTest('Pagination Test', false, `Pagination failed`, response);
    }
  } catch (error) {
    logTest('Pagination Test', false, `Request failed: ${error.message}`);
  }

  // Test search functionality
  try {
    const response = await makeRequest(`${BASE_URL}/api/admin/bookings?search=John`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data.success) {
      logTest('Search Test', true, `Search working, found ${response.data.bookings.length} matching records`, response);
    } else {
      logTest('Search Test', false, `Search failed`, response);
    }
  } catch (error) {
    logTest('Search Test', false, `Request failed: ${error.message}`);
  }
}

async function generateReport() {
  console.log('\n📋 Generating comprehensive test report...');
  
  const report = {
    summary: {
      total: testResults.passed + testResults.failed,
      passed: testResults.passed,
      failed: testResults.failed,
      success_rate: `${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%`
    },
    timestamp: new Date().toISOString(),
    tests: testResults.tests
  };

  // Save to file
  fs.writeFileSync('api-test-report.json', JSON.stringify(report, null, 2));
  
  console.log(`\n📊 TEST SUMMARY:`);
  console.log(`   Total Tests: ${report.summary.total}`);
  console.log(`   Passed: ${report.summary.passed}`);
  console.log(`   Failed: ${report.summary.failed}`);
  console.log(`   Success Rate: ${report.summary.success_rate}`);
  console.log(`\n📁 Detailed report saved to: api-test-report.json`);
  
  return report;
}

// Main test execution
async function runAllTests() {
  console.log('🚀 Starting comprehensive API testing for Supabase migration...');
  console.log('='.repeat(60));

  // Test basic connectivity first
  await testHealthCheck();
  
  // Test public API endpoints
  const newBooking = await testCreateBooking();
  if (newBooking) {
    await testGetBooking(newBooking.id);
  }
  
  await testCreateContact();
  
  // Test admin endpoints (requires authentication)
  const token = await getAuthToken();
  if (token) {
    await testAdminBookings(token);
    await testAdminContacts(token);
    await testAdminStats(token);
    await testAdvancedFeatures(token);
  }
  
  // Generate final report
  const report = await generateReport();
  
  console.log('\n🎉 API testing completed!');
  
  // Exit with appropriate code
  if (report.summary.failed > 0) {
    console.log('⚠️  Some tests failed. Please review the report for details.');
    process.exit(1);
  } else {
    console.log('✅ All tests passed successfully!');
    process.exit(0);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ or you need to install node-fetch');
  console.log('Install with: npm install node-fetch');
  process.exit(1);
}

runAllTests().catch((error) => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});