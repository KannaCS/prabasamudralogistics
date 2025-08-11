const http = require('http');

async function checkNextJSStatus() {
  console.log('🔍 Checking Next.js server status...');
  
  try {
    // Check what's running on port 3000
    const response = await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3000', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
    
    console.log(`✅ Next.js server responding with status: ${response.status}`);
    
    // Check if it's actually Next.js
    if (response.body.includes('Next.js')) {
      console.log('✅ Confirmed: Next.js application is running');
    } else {
      console.log('⚠️  Warning: Response doesn\'t appear to be from Next.js');
      console.log('Response preview:', response.body.substring(0, 200));
    }
    
    // Try to access a known Next.js endpoint
    console.log('\n🔍 Testing Next.js API endpoint structure...');
    
    const apiTest = await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3000/api/nonexistent', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
    
    console.log(`API endpoint test status: ${apiTest.status}`);
    if (apiTest.status === 404) {
      // Check if it's Next.js 404 or generic 404
      if (apiTest.body.includes('This page could not be found') || apiTest.body.includes('404')) {
        console.log('✅ Next.js API routing is working (proper 404 response)');
      } else {
        console.log('❌ Not a Next.js 404 response');
        console.log('Response:', apiTest.body.substring(0, 200));
      }
    }
    
    // Check if there might be compilation errors
    console.log('\n🔍 Testing if API routes are compiled...');
    
    // Try different API endpoints to see if any work
    const endpoints = ['/api/booking', '/api/contact', '/api/admin/login'];
    
    for (const endpoint of endpoints) {
      try {
        const testResponse = await new Promise((resolve, reject) => {
          const postData = JSON.stringify({ test: true });
          const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: endpoint,
            method: 'GET', // Try GET first
            headers: {
              'Content-Type': 'application/json'
            }
          }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data, endpoint }));
          });
          req.on('error', reject);
          req.setTimeout(3000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
          });
          req.end();
        });
        
        console.log(`${endpoint}: ${testResponse.status} ${testResponse.status === 404 ? '❌' : testResponse.status < 500 ? '✅' : '⚠️'}`);
        
      } catch (error) {
        console.log(`${endpoint}: Error - ${error.message} ❌`);
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to check Next.js status:', error.message);
  }
}

checkNextJSStatus();