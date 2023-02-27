import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { UpdateActivitySchema } from '../schemas/index.schema'

export const updateActivity = procedure
  .use(isAuthedMiddleWare)
  .input(UpdateActivitySchema)
  .mutation(async ({ input, ctx }) => {
    const { payload } = input
    const data = await prisma.activity.upsert({
      where: {
        userId_place_id: {
          userId: ctx.session?.user.id,
          place_id: payload.place_id,
        },
      },
      create: {
        discovered_at: new Date(),
        userId: ctx.session?.user.id,
        place_id: payload.place_id,
        reviewStatus: payload.reviewStatus,
        memo: payload.memo || '',
      },
      update: {
        memo: payload.memo,
        reviewStatus: payload.reviewStatus,
      },
    })
    return data
  })
