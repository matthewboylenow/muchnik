import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emailLogs } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

// GET /api/emails - List all email logs
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = request.nextUrl.searchParams.get('status');

    let query = db.select().from(emailLogs).orderBy(desc(emailLogs.createdAt));

    if (status === 'sent' || status === 'failed') {
      query = query.where(eq(emailLogs.status, status)) as typeof query;
    }

    const logs = await query;

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching email logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email logs' },
      { status: 500 }
    );
  }
}
