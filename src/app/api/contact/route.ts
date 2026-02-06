import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limiting: 3 submissions per 10 minutes per IP
    const { success } = rateLimit(`contact:${ip}`, {
      limit: 3,
      windowMs: 10 * 60 * 1000,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, caseDescription, howDidYouHear, website } = body;

    // Honeypot check - if filled, it's a bot
    if (website) {
      // Return success to not tip off the bot, but don't process
      return NextResponse.json({ success: true, id: 0 });
    }

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (typeof firstName !== 'string' || firstName.length > 100) {
      return NextResponse.json({ error: 'First name must be under 100 characters' }, { status: 400 });
    }
    if (typeof lastName !== 'string' || lastName.length > 100) {
      return NextResponse.json({ error: 'Last name must be under 100 characters' }, { status: 400 });
    }
    if (typeof email !== 'string' || email.length > 254) {
      return NextResponse.json({ error: 'Email must be under 254 characters' }, { status: 400 });
    }
    if (phone && (typeof phone !== 'string' || phone.length > 20)) {
      return NextResponse.json({ error: 'Phone must be under 20 characters' }, { status: 400 });
    }
    if (caseDescription && (typeof caseDescription !== 'string' || caseDescription.length > 5000)) {
      return NextResponse.json({ error: 'Case description must be under 5000 characters' }, { status: 400 });
    }
    if (howDidYouHear && (typeof howDidYouHear !== 'string' || howDidYouHear.length > 200)) {
      return NextResponse.json({ error: 'How did you hear about us must be under 200 characters' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Save to database
    const [submission] = await db
      .insert(submissions)
      .values({
        firstName,
        lastName,
        email,
        phone,
        caseDescription,
        howDidYouHear,
      })
      .returning();

    // Send email notifications with escaped HTML
    try {
      await sendContactNotification({
        firstName: escapeHtml(firstName),
        lastName: escapeHtml(lastName),
        email: escapeHtml(email),
        phone: phone ? escapeHtml(phone) : undefined,
        caseDescription: caseDescription ? escapeHtml(caseDescription) : undefined,
        howDidYouHear: howDidYouHear ? escapeHtml(howDidYouHear) : undefined,
      });

      await sendContactConfirmation(escapeHtml(firstName), email);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Continue even if email fails - submission is saved
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
