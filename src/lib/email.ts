import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const emailTemplates = {
  newBooking: (booking: any) => ({
    subject: `📦 Booking Baru: ${booking.bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🆕 Booking Baru Diterima</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detail Booking:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nomor Booking:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.bookingNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nama:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Telepon:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Perusahaan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.company || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Jenis Layanan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Asal:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.origin}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Tujuan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.destination}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Tanggal Pengiriman:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${new Date(booking.shipmentDate).toLocaleDateString('id-ID')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Berat:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.weight ? `${booking.weight} kg` : '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Dimensi:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.dimensions || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Instruksi Khusus:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.specialInstructions || '-'}</td>
            </tr>
          </table>
        </div>
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1e40af;">
            <strong>⚠️ Tindakan Diperlukan:</strong> Silakan login ke admin panel untuk memproses booking ini.
          </p>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 14px;">
          <p>Email ini dikirim otomatis dari sistem Praba Samudra Logistics</p>
          <p>Waktu: ${new Date().toLocaleString('id-ID')}</p>
        </div>
      </div>
    `
  }),

  newContact: (contact: any) => ({
    subject: `📧 Pesan Baru: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">📧 Pesan Baru Diterima</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detail Pesan:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nama:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${contact.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${contact.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Subjek:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${contact.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Pesan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
                  ${contact.message.replace(/\n/g, '<br>')}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>📝 Tindakan Diperlukan:</strong> Silakan login ke admin panel untuk membalas pesan ini.
          </p>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 14px;">
          <p>Email ini dikirim otomatis dari sistem Praba Samudra Logistics</p>
          <p>Waktu: ${new Date().toLocaleString('id-ID')}</p>
        </div>
      </div>
    `
  }),

  bookingStatusUpdate: (booking: any, oldStatus: string, newStatus: string) => ({
    subject: `🔄 Status Booking Diupdate: ${booking.bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">🔄 Update Status Booking</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detail Update:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nomor Booking:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.bookingNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nama Pelanggan:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${booking.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Status Sebelumnya:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="background: #fef3c7; padding: 4px 8px; border-radius: 4px; color: #92400e;">
                  ${oldStatus}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Status Baru:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="background: #dbeafe; padding: 4px 8px; border-radius: 4px; color: #1e40af;">
                  ${newStatus}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Waktu Update:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${new Date().toLocaleString('id-ID')}</td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 14px;">
          <p>Email ini dikirim otomatis dari sistem Praba Samudra Logistics</p>
        </div>
      </div>
    `
  })
};

// Email sending functions
export const emailService = {
  // Send new booking notification
  async sendNewBookingNotification(booking: any) {
    try {
      const template = emailTemplates.newBooking(booking);
      
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@prabasamudralogistics.com',
        to: 'admin@prabasamudralogistics.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('✅ New booking email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Failed to send new booking email:', error);
      return { success: false, error };
    }
  },

  // Send new contact notification
  async sendNewContactNotification(contact: any) {
    try {
      const template = emailTemplates.newContact(contact);
      
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@prabasamudralogistics.com',
        to: 'admin@prabasamudralogistics.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('✅ New contact email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Failed to send new contact email:', error);
      return { success: false, error };
    }
  },

  // Send booking status update notification
  async sendBookingStatusUpdateNotification(booking: any, oldStatus: string, newStatus: string) {
    try {
      const template = emailTemplates.bookingStatusUpdate(booking, oldStatus, newStatus);
      
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@prabasamudralogistics.com',
        to: 'admin@prabasamudralogistics.com',
        subject: template.subject,
        html: template.html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('✅ Booking status update email sent:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Failed to send booking status update email:', error);
      return { success: false, error };
    }
  },

  // Test email connection
  async testConnection() {
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
      return { success: true };
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      return { success: false, error };
    }
  }
}; 