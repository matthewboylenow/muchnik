import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Papa from 'papaparse';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    // Check auth
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allSubmissions = await db
      .select()
      .from(submissions)
      .orderBy(desc(submissions.createdAt));

    const csv = Papa.unparse(
      allSubmissions.map((s) => ({
        'First Name': s.firstName,
        'Last Name': s.lastName,
        Email: s.email,
        Phone: s.phone || '',
        'Case Description': s.caseDescription || '',
        'How Did You Hear': s.howDidYouHear || '',
        'Submitted At': s.createdAt.toISOString(),
        Read: s.read ? 'Yes' : 'No',
      }))
    );

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="submissions-${
          new Date().toISOString().split('T')[0]
        }.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting submissions:', error);
    return NextResponse.json(
      { error: 'Failed to export submissions' },
      { status: 500 }
    );
  }
}
