import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isAuthedMiddleWare } from '@/server/middleware'
import { MUTABLE_USER_DATA_SCHEMA, USER_ID_SCHEMA } from '../schema/index.schema'

export const updateUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: USER_ID_SCHEMA,
      payload: MUTABLE_USER_DATA_SCHEMA,
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
