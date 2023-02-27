import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { USER_ID_SCHEMA } from '../schema/index.schema'

export const getUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: USER_ID_SCHEMA,
    }),
  )
  .query(async ({ input, ctx }) => {
    const data = await ctx.prisma.user.findUnique({ where: { id: input.userId } })
    return data
  })
