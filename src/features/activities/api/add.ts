import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { AddActivitySchema, UpdateActivitySchema } from '../schemas/index.schema'
import { randomUUID } from 'crypto'

export const addActivity = procedure
  .use(isAuthedMiddleWare)
  .input(AddActivitySchema)
  .mutation(async ({ input, ctx }) => {
    const {
      activityId = randomUUID(),
      userId,
      place_id = '',
      memo = '',
      reviewStatus = 'NEW',
    } = input

    const data = await prisma.activity.upsert({
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
        userId,
        discovered_at: new Date(),
      },
    })
    return data
  })
