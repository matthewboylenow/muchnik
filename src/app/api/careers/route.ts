import { NextResponse } from 'next/server';
import { sendCareerApplicationNotification } from '@/lib/email';
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

    const { success } = rateLimit(`careers:${ip}`, {
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
    const { firstName, lastName, email, phone, position, message, resumeLink } = body;

    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (typeof firstName !== 'string' || firstName.length > 100) {
      return NextResponse.json({ error: 'First name must be under 100 characters' }, { status: 400 });
    }
    if (typeof lastName !== 'string' || lastName.length > 100) {
      return NextResponse.json({ error: 'Last name must be under 100 characters' }, { status: 400 });
    }
    if (typeof email !== 'string' || email.length > 254) {
      return NextResponse.json({ error: 'Email must be under 254 characters' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (phone && (typeof phone !== 'string' || phone.length > 20)) {
      return NextResponse.json({ error: 'Phone must be under 20 characters' }, { status: 400 });
    }
    if (typeof position !== 'string' || position.length > 200) {
      return NextResponse.json({ error: 'Position must be under 200 characters' }, { status: 400 });
    }
    if (message && (typeof message !== 'string' || message.length > 5000)) {
      return NextResponse.json({ error: 'Message must be under 5000 characters' }, { status: 400 });
    }
    if (resumeLink && (typeof resumeLink !== 'string' || resumeLink.length > 500)) {
      return NextResponse.json({ error: 'Resume link must be under 500 characters' }, { status: 400 });
    }

    try {
      await sendCareerApplicationNotification({
        firstName: escapeHtml(firstName),
        lastName: escapeHtml(lastName),
        email: escapeHtml(email),
        phone: phone ? escapeHtml(phone) : undefined,
        position: escapeHtml(position),
        message: message ? escapeHtml(message) : undefined,
        resumeLink: resumeLink ? escapeHtml(resumeLink) : undefined,
      });
    } catch (emailError) {
      console.error('Career application email error:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
