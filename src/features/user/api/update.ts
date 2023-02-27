import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isAuthedMiddleWare } from '@/server/middleware'

export const updateUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: z.string(),
      payload: z.object({
        name: z.string(),
      }),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const data = await ctx.prisma.user.update({
      where: {
        id: input.userId,
      },
      data: input.payload,
    })
    return data
  })
