# Praba Samudra Logistics - API Documentation

## Overview

This document describes the complete backend API for the Praba Samudra Logistics application. The API is built using Next.js 14 with App Router, Prisma ORM, and PostgreSQL database.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

### Admin Authentication
- **Method**: POST
- **Endpoint**: `/admin/login`
- **Description**: Admin login with JWT token
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login berhasil"
  }
  ```

### Verify Authentication
- **Method**: GET
- **Endpoint**: `/admin/auth/verify`
- **Description**: Verify admin authentication status
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "username": "admin",
      "role": "admin"
    }
  }
  ```

### Logout
- **Method**: POST
- **Endpoint**: `/admin/auth/logout`
- **Description**: Admin logout
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout berhasil"
  }
  ```

## Public APIs

### 1. Create Booking

- **Method**: POST
- **Endpoint**: `/booking`
- **Description**: Create a new booking/shipment request
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+62812345678",
    "company": "PT. Example",
    "serviceType": "domestic-shipping",
    "cargoType": "General Cargo",
    "origin": "Jakarta",
    "destination": "Surabaya",
    "shipmentDate": "2024-08-15",
    "weight": 1500.5,
    "dimensions": "2m x 1.5m x 1m",
    "specialInstructions": "Handle with care",
    "goodsType": "Electronics",
    "hsCode": "8517.12.00",
    "countryOrigin": "Indonesia",
    "countryDestination": "Singapore",
    "lartas": "LARTAS-001",
    "proforma": "PROFORMA-001",
    "exportImportType": "Export",
    "portOfLoading": "Tanjung Priok",
    "portOfDelivery": "Singapore Port",
    "laycan": "2024-08-15 to 2024-08-20",
    "packingList": "PL-001",
    "cargoPlan": "CP-001",
    "cargo": "Mixed cargo",
    "distance": "500 km",
    "pic": "Contact Person"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "bookingNumber": "PSL202408001",
      "fullName": "John Doe",
      "email": "john@example.com",
      "serviceType": "domestic-shipping",
      "origin": "Jakarta",
      "destination": "Surabaya",
      "shipmentDate": "2024-08-15T00:00:00.000Z",
      "status": "pending",
      "createdAt": "2024-08-01T10:00:00.000Z"
    },
    "message": "Booking berhasil dibuat"
  }
  ```

### 2. Get Booking

- **Method**: GET
- **Endpoint**: `/booking?id=uuid` or `/booking?bookingNumber=PSL202408001`
- **Description**: Get booking details by ID or booking number
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "bookingNumber": "PSL202408001",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+62812345678",
      "company": "PT. Example",
      "serviceType": "domestic-shipping",
      "cargoType": "General Cargo",
      "origin": "Jakarta",
      "destination": "Surabaya",
      "shipmentDate": "2024-08-15T00:00:00.000Z",
      "weight": 1500.5,
      "dimensions": "2m x 1.5m x 1m",
      "specialInstructions": "Handle with care",
      "status": "pending",
      "createdAt": "2024-08-01T10:00:00.000Z",
      "updatedAt": "2024-08-01T10:00:00.000Z"
    }
  }
  ```

### 3. Submit Contact Form

- **Method**: POST
- **Endpoint**: `/contact`
- **Description**: Submit contact form/inquiry
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Inquiry about shipping rates",
    "message": "Hello, I would like to know about your shipping rates from Jakarta to Bali for general cargo."
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Inquiry about shipping rates",
      "status": "unread",
      "createdAt": "2024-08-01T10:00:00.000Z"
    },
    "message": "Pesan berhasil dikirim"
  }
  ```

### 4. Get Contact

- **Method**: GET
- **Endpoint**: `/contact?id=uuid`
- **Description**: Get contact details by ID (admin only)
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Inquiry about shipping rates",
      "message": "Hello, I would like to know about your shipping rates...",
      "status": "unread",
      "createdAt": "2024-08-01T10:00:00.000Z",
      "updatedAt": "2024-08-01T10:00:00.000Z"
    }
  }
  ```

### 5. Track Shipment

- **Method**: GET
- **Endpoint**: `/tracking?bookingNumber=PSL202408001`
- **Description**: Track shipment status and progress
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "bookingNumber": "PSL202408001",
      "status": "confirmed",
      "origin": "Jakarta",
      "destination": "Surabaya",
      "serviceType": "domestic-shipping",
      "fullName": "John Doe",
      "estimatedDelivery": "2024-08-18T00:00:00.000Z",
      "actualDelivery": null,
      "timeline": [
        {
          "status": "Pesanan Dibuat",
          "date": "2024-08-01T10:00:00.000Z",
          "description": "Pesanan Anda telah diterima dan sedang diproses",
          "location": "Kantor Pusat"
        },
        {
          "status": "Pesanan Dikonfirmasi",
          "date": "2024-08-02T10:00:00.000Z",
          "description": "Pesanan Anda telah dikonfirmasi dan sedang dalam persiapan",
          "location": "Jakarta"
        }
      ],
      "progress": 25
    },
    "message": "Data tracking berhasil diambil"
  }
  ```

## Admin APIs

### 1. Dashboard Statistics

- **Method**: GET
- **Endpoint**: `/admin/stats`
- **Description**: Get dashboard statistics and analytics
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "overview": {
        "totalBookings": 150,
        "totalContacts": 45,
        "todayBookings": 5,
        "weekBookings": 25,
        "monthBookings": 100,
        "yearBookings": 150,
        "unreadContacts": 12,
        "bookingGrowthRate": 15.5
      },
      "bookingsByStatus": {
        "pending": 20,
        "confirmed": 30,
        "completed": 80,
        "cancelled": 5
      },
      "bookingsByService": [
        {
          "service": "domestic-shipping",
          "count": 50
        },
        {
          "service": "export-import",
          "count": 30
        }
      ],
      "statusDistribution": [
        {
          "status": "pending",
          "count": 20
        }
      ],
      "monthlyTrend": [
        {
          "month": "Jan",
          "bookings": 15
        }
      ],
      "recentActivity": {
        "bookings": [
          {
            "id": "uuid",
            "bookingNumber": "PSL202408001",
            "fullName": "John Doe",
            "serviceType": "domestic-shipping",
            "status": "pending",
            "createdAt": "2024-08-01T10:00:00.000Z"
          }
        ],
        "contacts": [
          {
            "id": "uuid",
            "fullName": "Jane Smith",
            "subject": "Inquiry about shipping rates",
            "status": "unread",
            "createdAt": "2024-08-01T10:00:00.000Z"
          }
        ]
      }
    }
  }
  ```

### 2. List Bookings

- **Method**: GET
- **Endpoint**: `/admin/bookings?page=1&limit=10&status=pending&search=john&sortBy=createdAt&sortOrder=desc`
- **Description**: Get paginated list of bookings with filtering and search
- **Headers**: Cookie with admin token
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10, max: 100)
  - `status`: Filter by status (pending, confirmed, processing, shipped, completed, cancelled)
  - `search`: Search in name, email, booking number, origin, destination
  - `sortBy`: Sort field (default: createdAt)
  - `sortOrder`: Sort order (asc, desc)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid",
        "bookingNumber": "PSL202408001",
        "fullName": "John Doe",
        "email": "john@example.com",
        "phone": "+62812345678",
        "company": "PT. Example",
        "serviceType": "domestic-shipping",
        "origin": "Jakarta",
        "destination": "Surabaya",
        "shipmentDate": "2024-08-15T00:00:00.000Z",
        "status": "pending",
        "createdAt": "2024-08-01T10:00:00.000Z",
        "updatedAt": "2024-08-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```

### 3. Get Individual Booking

- **Method**: GET
- **Endpoint**: `/admin/bookings/[id]`
- **Description**: Get detailed booking information
- **Headers**: Cookie with admin token
- **Response**: Full booking object with all fields

### 4. Update Booking

- **Method**: PUT
- **Endpoint**: `/admin/bookings/[id]`
- **Description**: Update booking details
- **Headers**: Cookie with admin token, `Content-Type: application/json`
- **Body**: Any booking fields to update
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "status": "confirmed",
      "updatedAt": "2024-08-01T11:00:00.000Z"
    },
    "message": "Booking berhasil diupdate"
  }
  ```

### 5. Delete Booking

- **Method**: DELETE
- **Endpoint**: `/admin/bookings/[id]`
- **Description**: Delete a booking
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "message": "Booking berhasil dihapus"
  }
  ```

### 6. List Contacts

- **Method**: GET
- **Endpoint**: `/admin/contacts?page=1&limit=10&status=unread&search=jane&sortBy=createdAt&sortOrder=desc`
- **Description**: Get paginated list of contacts with filtering and search
- **Headers**: Cookie with admin token
- **Query Parameters**: Same as bookings
- **Response**: Similar to bookings but with contact data

### 7. Get Individual Contact

- **Method**: GET
- **Endpoint**: `/admin/contacts/[id]`
- **Description**: Get detailed contact information
- **Headers**: Cookie with admin token
- **Response**: Full contact object with all fields

### 8. Update Contact

- **Method**: PUT
- **Endpoint**: `/admin/contacts/[id]`
- **Description**: Update contact details
- **Headers**: Cookie with admin token, `Content-Type: application/json`
- **Body**: Any contact fields to update
- **Response**: Similar to booking update

### 9. Delete Contact

- **Method**: DELETE
- **Endpoint**: `/admin/contacts/[id]`
- **Description**: Delete a contact
- **Headers**: Cookie with admin token
- **Response**: Similar to booking delete

### 10. Export Data

- **Method**: GET
- **Endpoint**: `/admin/export?type=bookings&format=csv&startDate=2024-08-01&endDate=2024-08-31`
- **Description**: Export bookings or contacts data
- **Headers**: Cookie with admin token
- **Query Parameters**:
  - `type`: 'bookings' or 'contacts'
  - `format`: 'json' or 'csv'
  - `startDate`: Start date for filtering (optional)
  - `endDate`: End date for filtering (optional)
- **Response**: JSON data or CSV file download

### 11. Bulk Operations

- **Method**: POST
- **Endpoint**: `/admin/bulk`
- **Description**: Perform bulk operations on bookings or contacts
- **Headers**: Cookie with admin token, `Content-Type: application/json`
- **Body**:
  ```json
  {
    "action": "update",
    "type": "bookings",
    "ids": ["uuid1", "uuid2", "uuid3"],
    "status": "confirmed"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "action": "update",
      "type": "bookings",
      "processedCount": 3,
      "totalRequested": 3
    },
    "message": "Bulk update berhasil dilakukan"
  }
  ```

### 12. Get Notifications

- **Method**: GET
- **Endpoint**: `/admin/notifications?limit=10`
- **Description**: Get system notifications and recent activities
- **Headers**: Cookie with admin token
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "notifications": [
        {
          "id": "new-bookings",
          "type": "info",
          "title": "Booking Baru",
          "message": "5 booking baru dalam 24 jam terakhir",
          "count": 5,
          "createdAt": "2024-08-01T10:00:00.000Z"
        }
      ],
      "summary": {
        "newBookings": 5,
        "unreadContacts": 12,
        "pendingBookings": 20,
        "totalNotifications": 15
      }
    }
  }
  ```

### 13. Search

- **Method**: GET
- **Endpoint**: `/admin/search?q=john&type=all&limit=20`
- **Description**: Search across bookings and contacts
- **Headers**: Cookie with admin token
- **Query Parameters**:
  - `q`: Search query (min 2 characters)
  - `type`: 'all', 'bookings', or 'contacts'
  - `limit`: Maximum results (default: 20)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "query": "john",
      "type": "all",
      "results": {
        "bookings": [
          {
            "id": "uuid",
            "bookingNumber": "PSL202408001",
            "fullName": "John Doe",
            "email": "john@example.com",
            "phone": "+62812345678",
            "company": "PT. Example",
            "serviceType": "domestic-shipping",
            "origin": "Jakarta",
            "destination": "Surabaya",
            "status": "pending",
            "createdAt": "2024-08-01T10:00:00.000Z"
          }
        ],
        "contacts": [
          {
            "id": "uuid",
            "fullName": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Inquiry about shipping rates",
            "status": "unread",
            "createdAt": "2024-08-01T10:00:00.000Z"
          }
        ],
        "total": 2
      },
      "totalResults": 2
    }
  }
  ```

## Error Responses

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

## Rate Limiting

- Contact form: 1 submission per 5 minutes per email
- Admin login: 5 attempts per 15 minutes
- General API: 100 requests per minute per IP

## Data Validation

### Booking Validation
- Required fields: fullName, email, phone, serviceType, origin, destination, shipmentDate
- Email format validation
- Phone number format validation
- Shipment date must be in the future
- String fields have length limits
- Numeric fields are validated

### Contact Validation
- Required fields: fullName, email, subject, message
- Email format validation
- String length limits
- Duplicate prevention (5-minute cooldown)

## Security Features

1. **JWT Authentication**: Secure admin authentication
2. **Input Sanitization**: All user inputs are sanitized
3. **SQL Injection Prevention**: Using Prisma ORM
4. **XSS Prevention**: Input validation and sanitization
5. **CSRF Protection**: SameSite cookies
6. **Rate Limiting**: Prevents abuse
7. **Error Handling**: Secure error messages

## Database Schema

### Booking Table
```sql
CREATE TABLE "Booking" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "company" TEXT,
  "serviceType" TEXT NOT NULL,
  "cargoType" TEXT,
  "origin" TEXT NOT NULL,
  "destination" TEXT NOT NULL,
  "shipmentDate" TIMESTAMP(3) NOT NULL,
  "weight" DOUBLE PRECISION,
  "dimensions" TEXT,
  "specialInstructions" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "bookingNumber" TEXT NOT NULL,
  "goodsType" TEXT,
  "hsCode" TEXT,
  "countryOrigin" TEXT,
  "countryDestination" TEXT,
  "lartas" TEXT,
  "proforma" TEXT,
  "exportImportType" TEXT,
  "portOfLoading" TEXT,
  "portOfDelivery" TEXT,
  "laycan" TEXT,
  "packingList" TEXT,
  "cargoPlan" TEXT,
  "cargo" TEXT,
  "distance" TEXT,
  "pic" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
```

### Contact Table
```sql
CREATE TABLE "Contact" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'unread',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
```

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/prabasamudralogistics?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Admin
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-admin-password"

# Environment
NODE_ENV="development"
```

## Development Setup

1. Install dependencies: `npm install`
2. Set up environment variables
3. Generate Prisma client: `npm run db:generate`
4. Run migrations: `npm run db:migrate`
5. Seed database: `npm run db:seed`
6. Start development server: `npm run dev`

## Production Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Run production migrations: `npx prisma migrate deploy`
4. Start production server: `npm start`

## API Testing

You can test the APIs using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

Example curl commands:

```bash
# Create booking
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","phone":"+62812345678","serviceType":"domestic-shipping","origin":"Jakarta","destination":"Surabaya","shipmentDate":"2024-08-15"}'

# Admin login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Get bookings (with cookie)
curl -X GET http://localhost:3000/api/admin/bookings \
  -b cookies.txt
``` 