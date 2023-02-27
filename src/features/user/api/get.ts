import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import { z } from 'zod'

export const getUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const data = await ctx.prisma.user.findUnique({ where: { id: input.userId } })
    return data
  })
