import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { randomUUID } from 'crypto'

import { AddActivitySchema, UpdateActivitySchema } from '../schemas/index.schema'

// utils
import { sleep } from '@/utils/sleep'

// data
import { details as detailsData } from '@/data/details'
import { isAuthedMiddleWare } from '@/server/middleware'
import { getActivity } from './getActivity'

export const deleteActivity = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      activityId: z.optional(z.string()),
      place_id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const data = await prisma.activity.delete({
      where: {
        userId_place_id: {
          userId: ctx.session?.user.id,
          place_id: input.place_id,
        },
      },
    })
    return data
  })

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

export const getUserActivities = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      const data = await prisma.activity.findMany({ where: { userId: input.userId } })

      // get details
      const details = await Promise.all(
        data.map(async (activity) => {
          await sleep(500)
          return { ...activity, ...detailsData.result(activity.place_id) }
        }),
      )

      return details
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export { getActivity }
