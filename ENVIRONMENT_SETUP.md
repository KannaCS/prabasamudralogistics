# Environment Setup Guide

## Database Configuration

Your database name is: `fzmvkmck_prabasamudralogistics`

## Email Configuration

SMTP server is already available on your server. Configure the email settings below.

### Step 1: Create .env file

Create a `.env` file in your project root with the following content:

```env
# Database Configuration
# Replace with your actual PostgreSQL database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/fzmvkmck_prabasamudralogistics?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email Configuration (SMTP)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@prabasamudralogistics.com

# Environment
NODE_ENV=development
```

### Step 2: Update Database Credentials

Replace the following in your `.env` file:

- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port
- `fzmvkmck_prabasamudralogistics`: Your database name (already set)

### Step 3: Update Email Credentials

Replace the following in your `.env` file:

- `SMTP_HOST`: Your SMTP server host
- `SMTP_PORT`: Your SMTP server port (usually 587 or 465)
- `SMTP_SECURE`: true for port 465, false for other ports
- `SMTP_USER`: Your SMTP username
- `SMTP_PASS`: Your SMTP password
- `SMTP_FROM`: From email address (noreply@prabasamudralogistics.com)

### Step 4: Generate Prisma Client

```bash
npm run db:generate
```

### Step 5: Run Database Migrations

```bash
npm run db:migrate
```

### Step 6: Seed the Database (Optional)

```bash
npm run db:seed
```

### Step 7: Test Email Connection

```bash
# Test SMTP connection
curl -X POST http://localhost:3000/api/admin/test-email \
  -H "Content-Type: application/json" \
  -d '{"testType":"connection"}' \
  -b cookies.txt
```

### Step 8: Test the Connection

```bash
npm run dev
```

## Example .env file:

```env
# Database Configuration
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/fzmvkmck_prabasamudralogistics?schema=public"

# JWT Configuration
JWT_SECRET=praba-samudra-logistics-super-secret-jwt-key-2024

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-admin-password-123

# Email Configuration (SMTP)
SMTP_HOST=mail.prabasamudralogistics.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@prabasamudralogistics.com
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@prabasamudralogistics.com

# Environment
NODE_ENV=development
```

## Important Notes:

1. **Never commit your .env file** to version control
2. **Change the JWT_SECRET** in production
3. **Use strong passwords** for admin credentials
4. **Ensure PostgreSQL is running** before running migrations
5. **Check database permissions** for your user

## Troubleshooting:

If you get connection errors:
1. Verify PostgreSQL is running
2. Check your credentials
3. Ensure the database exists
4. Verify network connectivity
5. Check firewall settings 