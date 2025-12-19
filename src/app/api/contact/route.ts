import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, caseDescription, howDidYouHear } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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

    // Send email notifications
    try {
      await sendContactNotification({
        firstName,
        lastName,
        email,
        phone,
        caseDescription,
        howDidYouHear,
      });

      await sendContactConfirmation(firstName, email);
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
