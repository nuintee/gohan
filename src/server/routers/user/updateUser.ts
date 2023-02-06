import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'

export const updateUser = procedure
  .input(
    z.object({
      userId: z.string(),
      payload: z.object({
        name: z.string(),
      }),
    }),
  )
  .mutation(async ({ input }) => {
    const data = await prisma.user.update({
      where: {
        id: input.userId,
      },
      data: input.payload,
    })
    return data
  })
