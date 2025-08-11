const { PrismaClient } = require('@prisma/client');
const http = require('http');

const prisma = new PrismaClient();

// Simple test route without email dependencies
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/test-contact' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        console.log('Received contact data:', data);

        // Test database connection and create contact
        const contact = await prisma.contact.create({
          data: {
            fullName: data.fullName || 'Test User',
            email: data.email || 'test@example.com',
            subject: data.subject || 'Test Subject',
            message: data.message || 'Test Message'
          }
        });

        res.writeHead(201);
        res.end(JSON.stringify({
          success: true,
          contact: {
            id: contact.id,
            fullName: contact.fullName,
            email: contact.email,
            subject: contact.subject,
            createdAt: contact.createdAt
          },
          message: 'Contact created successfully'
        }));

      } catch (error) {
        console.error('Error creating contact:', error);
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
  } else if (req.url === '/test-booking' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        console.log('Received booking data:', data);

        // Generate simple booking number
        const bookingNumber = `PSL${Date.now()}`;

        const booking = await prisma.booking.create({
          data: {
            fullName: data.fullName || 'Test User',
            email: data.email || 'test@example.com',
            phone: data.phone || '+621234567890',
            serviceType: data.serviceType || 'domestic-shipping',
            origin: data.origin || 'Jakarta',
            destination: data.destination || 'Surabaya',
            shipmentDate: new Date(data.shipmentDate || new Date()),
            bookingNumber
          }
        });

        res.writeHead(201);
        res.end(JSON.stringify({
          success: true,
          booking: {
            id: booking.id,
            bookingNumber: booking.bookingNumber,
            fullName: booking.fullName,
            email: booking.email,
            serviceType: booking.serviceType,
            status: booking.status,
            createdAt: booking.createdAt
          },
          message: 'Booking created successfully'
        }));

      } catch (error) {
        console.error('Error creating booking:', error);
        res.writeHead(500);
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /test-contact');
  console.log('  POST /test-booking');
});