async function testNextjsAPIWithSQLite() {
  const BASE_URL = 'http://localhost:3000';
  
  console.log('🚀 Testing Next.js API routes with SQLite backend...');
  
  // Test 1: Check if server is running
  try {
    console.log('🔄 Testing server connectivity...');
    const healthResponse = await fetch(BASE_URL);
    if (healthResponse.ok) {
      console.log('✅ Next.js server is responding');
    } else {
      console.log(`⚠️  Server responded with status: ${healthResponse.status}`);
    }
  } catch (error) {
    console.log('❌ Server connectivity failed:', error.message);
    console.log('⚠️  Make sure the Next.js server is running (npm run dev)');
    return;
  }
  
  // Test 2: Test contact API endpoint
  try {
    console.log('🔄 Testing POST /api/contact...');
    const contactResponse = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'API Test User',
        email: 'apitest@sqlite.com',
        subject: 'SQLite API Test',
        message: 'Testing contact API with SQLite backend'
      })
    });
    
    const contactData = await contactResponse.json();
    
    console.log('📋 Contact API Response:', {
      status: contactResponse.status,
      data: contactData
    });
    
    if (contactResponse.ok && contactData.success) {
      console.log(`✅ Contact API working: Contact created with ID ${contactData.data.id}`);
    } else if (contactResponse.status === 429) {
      console.log('⚠️  Contact API rate limited (this is expected after multiple tests)');
    } else {
      console.log('❌ Contact API failed. Response details:', contactData);
    }
  } catch (error) {
    console.log('❌ Contact API test failed:', error.message);
  }
  
  // Test 3: Test booking API endpoint
  try {
    console.log('🔄 Testing POST /api/booking...');
    const bookingResponse = await fetch(`${BASE_URL}/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'API Test Booking',
        email: 'booking@sqlite.com',
        phone: '+6281234567890',
        company: 'SQLite Test Company',
        serviceType: 'domestic-shipping',
        cargoType: 'Electronics',
        origin: 'Jakarta API Test',
        destination: 'Bandung API Test',
        shipmentDate: new Date().toISOString(),
        weight: 500,
        dimensions: '50cm x 50cm x 50cm',
        specialInstructions: 'API test with SQLite'
      })
    });
    
    const bookingData = await bookingResponse.json();
    
    console.log('📋 Booking API Response:', {
      status: bookingResponse.status,
      data: bookingData
    });
    
    if (bookingResponse.ok && bookingData.success) {
      console.log(`✅ Booking API working: Booking created with ID ${bookingData.data.id}`);
      console.log(`   Booking Number: ${bookingData.data.bookingNumber}`);
    } else {
      console.log('❌ Booking API failed. Response details:', bookingData);
    }
  } catch (error) {
    console.log('❌ Booking API test failed:', error.message);
  }
  
  // Test 4: Test admin login
  try {
    console.log('🔄 Testing POST /api/admin/login...');
    const loginResponse = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ Admin login API working: Authentication successful');
      
      // Test admin bookings endpoint
      const bookingsResponse = await fetch(`${BASE_URL}/api/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      
      const bookingsData = await bookingsResponse.json();
      
      if (bookingsResponse.ok && bookingsData.success) {
        console.log(`✅ Admin bookings API working: Found ${bookingsData.bookings.length} bookings`);
      }
    } else {
      console.log('❌ Admin login failed:', loginData);
    }
  } catch (error) {
    console.log('❌ Admin API test failed:', error.message);
  }
  
  console.log('\n🎉 Next.js API + SQLite backend testing completed!');
}

// Check if fetch is available
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ or you need to install node-fetch');
  process.exit(1);
}

testNextjsAPIWithSQLite().catch(error => {
  console.error('❌ API test failed:', error);
  process.exit(1);
});