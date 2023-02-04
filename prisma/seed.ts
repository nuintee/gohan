import prisma from '@/libs/prisma'

// data
import { user } from '@/data/user'

async function main() {
  const devUser = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {},
    create: user,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
