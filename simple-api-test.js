const http = require('http');

// Simple HTTP request function
function makeHttpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Starting simple API tests...');
  
  try {
    // Test 1: Check if server is running
    console.log('\n1️⃣ Testing server connectivity...');
    const healthCheck = await makeHttpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    
    console.log(`✅ Server Status: ${healthCheck.statusCode}`);
    if (healthCheck.statusCode !== 200) {
      console.log('❌ Server not responding properly');
      return;
    }
    
    // Test 2: Test Contact API
    console.log('\n2️⃣ Testing POST /api/contact...');
    const contactData = JSON.stringify({
      fullName: 'Test User Simple',
      email: 'simple@example.com',
      subject: 'Simple Test',
      message: 'This is a simple test message'
    });
    
    const contactResponse = await makeHttpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(contactData)
      }
    }, contactData);
    
    console.log(`Contact API Status: ${contactResponse.statusCode}`);
    console.log('Response:', contactResponse.body.substring(0, 200));
    
    // Test 3: Test Booking API
    console.log('\n3️⃣ Testing POST /api/booking...');
    const bookingData = JSON.stringify({
      fullName: 'Test Booking User',
      email: 'booking@example.com',
      phone: '+621234567890',
      serviceType: 'domestic-shipping',
      origin: 'Jakarta',
      destination: 'Surabaya',
      shipmentDate: new Date().toISOString()
    });
    
    const bookingResponse = await makeHttpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/booking',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bookingData)
      }
    }, bookingData);
    
    console.log(`Booking API Status: ${bookingResponse.statusCode}`);
    console.log('Response:', bookingResponse.body.substring(0, 200));
    
    // Test 4: Test Admin Login
    console.log('\n4️⃣ Testing POST /api/admin/login...');
    const loginData = JSON.stringify({
      username: 'admin',
      password: 'admin123'
    });
    
    const loginResponse = await makeHttpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, loginData);
    
    console.log(`Admin Login Status: ${loginResponse.statusCode}`);
    console.log('Response:', loginResponse.body.substring(0, 200));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();