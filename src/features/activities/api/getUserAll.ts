import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { details as detailsData } from '@/data/details'
import { sleep } from '@/utils/sleep'
import { USER_ID_SCHEMA } from '@/features/user/schema/index.schema'

export const getUserActivities = procedure
  .input(
    z.object({
      userId: USER_ID_SCHEMA,
    }),
  )
  .query(async ({ input, ctx }) => {
    if (IS_DEVMODE) {
      const data = await ctx.prisma.activity.findMany({ where: { userId: input.userId } })

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
