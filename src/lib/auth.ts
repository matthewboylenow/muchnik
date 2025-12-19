import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: string;
  email: string;
  isLoggedIn: boolean;
}

const sessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET!,
  cookieName: 'muchnik-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session.isLoggedIn ? session : null;
}

export async function createSession(userId: string, email: string) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.userId = userId;
  session.email = email;
  session.isLoggedIn = true;
  await session.save();
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
}
