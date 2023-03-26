import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import { AddActivitySchema } from '../schemas/index.schema'
import { randomUUID } from 'crypto'

export const addActivity = procedure
  .use(isAuthedMiddleWare)
  .input(AddActivitySchema)
  .mutation(async ({ input, ctx }) => {
    const { activityId = randomUUID(), memo = '', reviewStatus = 'NEW', place_id } = input

    const data = await ctx.prisma.activity.upsert({
      where: {
        userId_place_id: {
          userId: ctx.session.user.id,
          place_id,
        },
      },
      update: {},
      create: {
        id: activityId,
        place_id,
        memo,
        reviewStatus,
        userId: ctx.session.user.id,
        discovered_at: new Date(),
      },
    })
    return data
  })
