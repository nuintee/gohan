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

export const getActivity = procedure
  .input(
    z.object({
      userId: z.optional(z.string()),
      place_id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      let data

      if (input.userId) {
        // Get activity when authed
        data = await prisma.activity.findUnique({
          where: {
            userId_place_id: {
              userId: input.userId,
              place_id: input.place_id,
            },
          },
        })
      }

      const detailed = detailsData.result(input?.place_id as string)
      return { ...data, ...detailed }
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const deleteActivity = procedure
  .input(
    z.object({
      activityId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    if (IS_DEVMODE) {
      // mock
      const data = await prisma.activity.delete({
        where: {
          id: input.activityId,
        },
      })
      return data
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })

export const updateActivity = procedure.input(UpdateActivitySchema).mutation(async ({ input }) => {
  if (IS_DEVMODE) {
    // mock
    const data = await prisma.activity.update({
      where: {
        id: input.activityId,
      },
      data: input.payload,
    })
    return data
  } else if (IS_PRODMODE) {
    // Google API
  } else {
    // test
  }
})

export const addActivity = procedure.input(AddActivitySchema).mutation(async ({ input }) => {
  const {
    activityId = randomUUID(),
    userId,
    place_id = '',
    memo = '',
    reviewStatus = 'NEW',
  } = input

  if (IS_DEVMODE) {
    const data = await prisma.activity.create({
      data: {
        id: activityId,
        place_id,
        memo,
        reviewStatus,
        userId,
        discovered_at: new Date(),
      },
    })
    return data
  } else if (IS_PRODMODE) {
  } else {
  }
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
