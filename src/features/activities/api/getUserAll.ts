import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { sleep } from '@/utils/sleep'
import { USER_ID_SCHEMA } from '@/features/user/schema/index.schema'
import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'

export const getUserActivities = procedure
  .input(
    z.object({
      userId: USER_ID_SCHEMA,
    }),
  )
  .query(async ({ input, ctx }) => {
    const data = await ctx.prisma.activity.findMany({ where: { userId: input.userId } })

    const details = await Promise.all(
      data.map(async (activity) => {
        const query = await getBareDetailsAPI({ place_id: activity.place_id })
        return { ...activity, ...query.result }
      }),
    )

    return details
  })
