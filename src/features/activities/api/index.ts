import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { randomUUID } from 'crypto'

export const getActivity = procedure
  .input(
    z.object({
      activityId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    if (IS_DEVMODE) {
      const data = await prisma.activity.findUnique({ where: { id: input.activityId } })
      return data
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

export const updateActivity = procedure
  .input(
    z.object({
      activityId: z.string(),
      payload: z.object({
        is_liked: z.boolean(),
      }),
    }),
  )
  .mutation(async ({ input }) => {
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

export const addActivity = procedure
  .input(
    z.object({
      activityId: z.optional(z.string().uuid()),
      userId: z.string().uuid(),
      place_id: z.optional(z.string()),
      is_liked: z.optional(z.boolean()),
    }),
  )
  .mutation(async ({ input }) => {
    const { activityId = randomUUID(), userId, place_id = '', is_liked = false } = input

    if (IS_DEVMODE) {
      const data = await prisma.activity.create({
        data: {
          id: activityId,
          place_id,
          is_liked,
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
      return data
    } else if (IS_PRODMODE) {
      // Google API
    } else {
      // test
    }
  })
