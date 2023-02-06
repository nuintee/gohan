import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'

export const getActivity = procedure
  .input(
    z.object({
      activityId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await prisma.activity.findUnique({ where: { id: input.activityId } })
    return data
  })

export const getUserActivities = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await prisma.activity.findMany({ where: { userId: input.userId } })
    return data
  })
