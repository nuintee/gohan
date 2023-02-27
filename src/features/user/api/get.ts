import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'

export const getUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await prisma.user.findUnique({ where: { id: input.userId } })
    return data
  })
