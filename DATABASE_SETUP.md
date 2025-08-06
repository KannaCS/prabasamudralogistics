# PostgreSQL Database Setup Guide

This guide will help you set up the PostgreSQL database for the Praba Samudra Logistics application.

## Prerequisites

1. **PostgreSQL Database Server**
   - Install PostgreSQL on your system
   - Create a database for the application
   - Note down the connection details (host, port, username, password, database name)

2. **Node.js and npm**
   - Ensure you have Node.js 18+ installed
   - npm should be available

## Setup Instructions

### 1. Environment Configuration

Create or update your `.env` file in the project root with your PostgreSQL connection details:

```env
# Database Configuration
# Replace with your actual PostgreSQL database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/prabasamudralogistics?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
```

**Important:** Replace the placeholder values with your actual database credentials:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port
- `prabasamudralogistics`: Your database name

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

This will create the necessary tables in your PostgreSQL database.

### 5. Seed the Database (Optional)

To populate your database with sample data for testing:

```bash
npm run db:seed
```

This will create:
- 5 sample bookings with different statuses
- 5 sample contact messages
- Various service types and scenarios

### 6. Verify Setup

You can verify your database setup by:

1. **Using Prisma Studio** (Database GUI):
   ```bash
   npm run db:studio
   ```
   This opens a web interface at `http://localhost:5555`

2. **Starting the development server**:
   ```bash
   npm run dev
   ```
   The application should start without database connection errors.

## Database Schema

The application uses two main tables:

### Booking Table
- Stores all booking/shipment requests
- Includes customer details, service type, cargo information
- Supports various logistics services (domestic shipping, export/import, etc.)
- Tracks booking status (pending, confirmed, processing, shipped, completed, cancelled)

### Contact Table
- Stores customer inquiries and messages
- Tracks message status (unread, read, replied)
- Used for customer support and communication

## API Endpoints

### Public Endpoints
- `POST /api/booking` - Create new booking
- `GET /api/booking?id=xxx` - Get booking by ID
- `GET /api/booking?bookingNumber=xxx` - Get booking by booking number
- `POST /api/contact` - Submit contact form
- `GET /api/tracking?bookingNumber=xxx` - Track shipment

### Admin Endpoints (Requires Authentication)
- `GET /api/admin/bookings` - List all bookings with pagination
- `PUT /api/admin/bookings` - Update booking status
- `DELETE /api/admin/bookings?id=xxx` - Delete booking
- `GET /api/admin/contacts` - List all contacts with pagination
- `PUT /api/admin/contacts` - Update contact status
- `DELETE /api/admin/contacts?id=xxx` - Delete contact
- `GET /api/admin/stats` - Get dashboard statistics
- `POST /api/admin/login` - Admin login

## Database Management Commands

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Reset database (WARNING: This will delete all data)
npm run db:reset

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Production Deployment

### Environment Variables
Ensure these environment variables are set in your production environment:

```env
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
JWT_SECRET="your-production-jwt-secret"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-admin-password"
NODE_ENV="production"
```

### Database Migration
Run migrations in production:

```bash
npx prisma migrate deploy
```

### Security Considerations

1. **Database Credentials**: Never commit real database credentials to version control
2. **JWT Secret**: Use a strong, unique JWT secret in production
3. **Admin Password**: Use a strong admin password
4. **Database Access**: Restrict database access to authorized IPs only
5. **SSL**: Enable SSL for database connections in production

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your DATABASE_URL format and credentials
2. **Migration Errors**: Ensure the database exists and user has proper permissions
3. **Permission Denied**: Make sure the database user has CREATE, ALTER, DROP permissions
4. **Port Issues**: Verify PostgreSQL is running on the specified port

### Logs
Check application logs for detailed error messages:
```bash
npm run dev
```

### Database Connection Test
You can test the database connection using Prisma:
```bash
npx prisma db pull
```

## Support

If you encounter issues:
1. Check the error logs
2. Verify your environment variables
3. Ensure PostgreSQL is running and accessible
4. Check database user permissions

For additional help, refer to:
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)