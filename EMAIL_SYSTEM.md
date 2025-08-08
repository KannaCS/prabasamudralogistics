# Email System Documentation

## 📧 Overview

The email system automatically sends notifications to `admin@prabasamudralogistics.com` for various events in the logistics application.

## 🎯 Features

### ✅ **Automatic Email Notifications**

1. **New Booking Notifications**
   - Sent when a customer submits a new booking
   - Includes complete booking details
   - Professional HTML email template

2. **New Contact Notifications**
   - Sent when a customer submits a contact form
   - Includes customer message and details
   - Professional HTML email template

3. **Booking Status Updates**
   - Sent when admin updates booking status
   - Shows old and new status
   - Professional HTML email template

### ✅ **Email Templates**

All emails use professional HTML templates with:
- Company branding
- Responsive design
- Clear information layout
- Action items for admin

## 🔧 Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Email Configuration (SMTP)
SMTP_HOST=mail.prabasamudralogistics.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@prabasamudralogistics.com
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@prabasamudralogistics.com
```

### SMTP Settings

- **Host**: Your SMTP server hostname
- **Port**: Usually 587 (TLS) or 465 (SSL)
- **Secure**: true for port 465, false for other ports
- **User**: SMTP username
- **Pass**: SMTP password
- **From**: From email address

## 📨 Email Types

### 1. New Booking Email

**Trigger**: When customer submits booking form
**To**: admin@prabasamudralogistics.com
**Subject**: `📦 Booking Baru: PSL202400001`

**Content includes**:
- Booking number
- Customer details (name, email, phone)
- Company information
- Service type
- Origin and destination
- Shipment date
- Weight and dimensions
- Special instructions

### 2. New Contact Email

**Trigger**: When customer submits contact form
**To**: admin@prabasamudralogistics.com
**Subject**: `📧 Pesan Baru: [Subject]`

**Content includes**:
- Customer name and email
- Message subject
- Full message content
- Timestamp

### 3. Booking Status Update Email

**Trigger**: When admin updates booking status
**To**: admin@prabasamudralogistics.com
**Subject**: `🔄 Status Booking Diupdate: PSL202400001`

**Content includes**:
- Booking number
- Customer name
- Old status
- New status
- Update timestamp

## 🧪 Testing

### Test Email API

Use the test endpoint to verify email functionality:

```bash
# Test SMTP connection
curl -X POST http://localhost:3000/api/admin/test-email \
  -H "Content-Type: application/json" \
  -d '{"testType":"connection"}' \
  -b cookies.txt

# Test booking notification
curl -X POST http://localhost:3000/api/admin/test-email \
  -H "Content-Type: application/json" \
  -d '{"testType":"booking"}' \
  -b cookies.txt

# Test contact notification
curl -X POST http://localhost:3000/api/admin/test-email \
  -H "Content-Type: application/json" \
  -d '{"testType":"contact"}' \
  -b cookies.txt
```

### Test Types

1. **connection**: Tests SMTP server connection
2. **booking**: Sends test booking notification email
3. **contact**: Sends test contact notification email

## 📋 API Endpoints

### Test Email
- **Method**: POST
- **Endpoint**: `/api/admin/test-email`
- **Auth**: Admin required
- **Body**: `{"testType": "connection|booking|contact"}`

## 🔄 Integration Points

### Automatic Triggers

1. **Booking Creation** (`/api/booking` POST)
   - Automatically sends new booking notification
   - Non-blocking (doesn't fail if email fails)

2. **Contact Submission** (`/api/contact` POST)
   - Automatically sends new contact notification
   - Non-blocking (doesn't fail if email fails)

3. **Booking Status Update** (`/api/admin/bookings/[id]` PUT)
   - Automatically sends status update notification
   - Only sends if status actually changed
   - Non-blocking (doesn't fail if email fails)

## 🛡️ Error Handling

### Graceful Degradation

- Email failures don't affect main functionality
- All email operations are wrapped in try-catch
- Errors are logged but don't break the application
- Booking/contact creation succeeds even if email fails

### Error Logging

All email errors are logged with:
- Error details
- Timestamp
- Operation type
- Affected data

## 📊 Monitoring

### Email Status Tracking

- Success/failure logging
- Message ID tracking
- Delivery confirmation
- Error reporting

### Log Messages

```
✅ New booking email sent: <message-id>
✅ New contact email sent: <message-id>
✅ Booking status update email sent: <message-id>
❌ Failed to send new booking email: <error>
❌ Failed to send new contact email: <error>
❌ Failed to send booking status update email: <error>
```

## 🎨 Email Templates

### Design Features

- **Responsive**: Works on desktop and mobile
- **Professional**: Company branding and colors
- **Clear**: Easy to read and understand
- **Actionable**: Clear next steps for admin

### Template Structure

1. **Header**: Company branding and title
2. **Content**: Detailed information in tables
3. **Action**: Clear call-to-action for admin
4. **Footer**: Timestamp and system info

## 🔧 Customization

### Template Modification

Edit email templates in `src/lib/email.ts`:

```typescript
const emailTemplates = {
  newBooking: (booking: any) => ({
    subject: `📦 Booking Baru: ${booking.bookingNumber}`,
    html: `... your custom HTML ...`
  }),
  // ... other templates
};
```

### Adding New Email Types

1. Add new template to `emailTemplates`
2. Add new function to `emailService`
3. Integrate with appropriate API endpoint
4. Test thoroughly

## 🚀 Production Deployment

### Environment Setup

1. **Configure SMTP credentials** in production environment
2. **Test email functionality** before going live
3. **Monitor email delivery** in production
4. **Set up email monitoring** and alerts

### Security Considerations

- **SMTP credentials** stored securely
- **Email validation** to prevent spam
- **Rate limiting** to prevent abuse
- **Error handling** to prevent information leakage

## 📞 Support

### Troubleshooting

1. **Check SMTP credentials** in environment variables
2. **Verify SMTP server** is accessible
3. **Test email connection** using test endpoint
4. **Check server logs** for error details
5. **Verify email delivery** in admin inbox

### Common Issues

- **Authentication failed**: Check SMTP credentials
- **Connection timeout**: Check SMTP host and port
- **Email not delivered**: Check spam folder and SMTP settings
- **Template errors**: Check HTML syntax in templates 