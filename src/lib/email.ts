import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendContactNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  caseDescription?: string;
  howDidYouHear?: string;
}

export async function sendContactNotification(data: SendContactNotificationProps) {
  return await resend.emails.send({
    from: 'Muchnik Elder Law <noreply@muchnikelderlaw.com>',
    to: process.env.CONTACT_EMAIL!,
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>How they heard about us:</strong> ${data.howDidYouHear || 'Not specified'}</p>
      <h3>Case Description:</h3>
      <p>${data.caseDescription || 'Not provided'}</p>
    `,
  });
}

export async function sendContactConfirmation(firstName: string, email: string) {
  return await resend.emails.send({
    from: 'Muchnik Elder Law <noreply@muchnikelderlaw.com>',
    to: email,
    subject: 'Thank you for contacting Muchnik Elder Law',
    html: `
      <h2>Thank you for reaching out, ${firstName}!</h2>
      <p>We have received your message and will get back to you within 1-2 business days.</p>
      <p>If your matter is urgent, please call us directly:</p>
      <ul>
        <li>Staten Island: (718) 442-7004</li>
        <li>Manhattan: (212) 597-2427</li>
        <li>New Jersey: (201) 582-8014</li>
      </ul>
      <p>Best regards,<br>Muchnik Elder Law P.C.</p>
    `,
  });
}
