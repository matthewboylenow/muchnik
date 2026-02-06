import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_SES_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

const fromAddress = `${process.env.AWS_SES_FROM_NAME || 'Muchnik Elder Law'} <${process.env.AWS_SES_FROM_EMAIL || 'noreply@muchnikelderlaw.com'}>`;

interface SendContactNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  caseDescription?: string;
  howDidYouHear?: string;
}

export async function sendContactNotification(data: SendContactNotificationProps) {
  const command = new SendEmailCommand({
    Source: fromAddress,
    Destination: {
      ToAddresses: [process.env.CONTACT_EMAIL!],
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      },
      Body: {
        Html: {
          Data: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>How they heard about us:</strong> ${data.howDidYouHear || 'Not specified'}</p>
      <h3>Case Description:</h3>
      <p>${data.caseDescription || 'Not provided'}</p>
    `,
        },
      },
    },
  });

  return await ses.send(command);
}

export async function sendContactConfirmation(firstName: string, email: string) {
  const command = new SendEmailCommand({
    Source: fromAddress,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Thank you for contacting Muchnik Elder Law',
      },
      Body: {
        Html: {
          Data: `
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
        },
      },
    },
  });

  return await ses.send(command);
}
