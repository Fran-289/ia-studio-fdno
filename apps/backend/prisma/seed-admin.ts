import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'test@demo.com';

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash('admin', 12);

  await prisma.adminUser.create({
    data: {
      email,
      name: 'Admin',
      password: hashed,
      role: 'admin',
    },
  });

  console.log(`Admin created: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
