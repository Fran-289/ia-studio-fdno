import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create system configurations
  const configs = [
    { key: 'credits_per_generation', value: { image: 50, video: 200, voice: 30 } },
    { key: 'free_plan_credits', value: 50 },
    { key: 'pro_plan_credits', value: 500 },
    { key: 'business_plan_credits', value: 2000 },
    { key: 'max_file_size', value: 104857600 }, // 100MB
  ];

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: { key: config.key, value: config.value },
    });
  }

  // Create default AI models
  const models = [
    { name: 'DALL-E 3', provider: 'OPENAI' as const, type: 'IMAGE', costPerUse: 50 },
    { name: 'FLUX Pro', provider: 'FLUX' as const, type: 'IMAGE', costPerUse: 40 },
    { name: 'FLUX Schnell', provider: 'FLUX' as const, type: 'IMAGE', costPerUse: 20 },
    { name: 'Stable Diffusion 3', provider: 'STABLE_DIFFUSION' as const, type: 'IMAGE', costPerUse: 30 },
    { name: 'Stable Diffusion XL', provider: 'STABLE_DIFFUSION' as const, type: 'IMAGE', costPerUse: 25 },
    { name: 'Veo', provider: 'VEO' as const, type: 'VIDEO', costPerUse: 200 },
    { name: 'Runway Gen-3', provider: 'RUNWAY' as const, type: 'VIDEO', costPerUse: 150 },
    { name: 'Kling', provider: 'KLING' as const, type: 'VIDEO', costPerUse: 100 },
    { name: 'Luma Dream Machine', provider: 'LUMA' as const, type: 'VIDEO', costPerUse: 120 },
    { name: 'ElevenLabs', provider: 'ELEVENLABS' as const, type: 'VOICE', costPerUse: 30 },
  ];

  for (const model of models) {
    await prisma.aIModel.create({ data: model });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
