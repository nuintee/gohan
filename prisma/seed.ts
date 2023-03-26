import prisma from '@/libs/prisma'

// data
import { user } from '@/data/user'
import { _testActivity } from '@/data/activities'

async function main() {
  await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {},
    create: user,
  })

  await prisma.activity.upsert({
    where: {
      id: _testActivity.id,
    },
    update: {},
    create: _testActivity,
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
