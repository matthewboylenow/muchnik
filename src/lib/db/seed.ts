import { db } from './index';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  const email = process.env.SUPER_ADMIN_EMAIL!;
  const password = process.env.SUPER_ADMIN_PASSWORD!;

  if (!email || !password) {
    console.error('Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in environment');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await db.insert(users).values({
      email,
      passwordHash,
      name: 'Matthew',
    }).onConflictDoNothing();

    console.log('✅ Super admin seeded successfully');
    console.log(`   Email: ${email}`);
  } catch (error) {
    console.error('❌ Error seeding super admin:', error);
    process.exit(1);
  }
}

seed();
