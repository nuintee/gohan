import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { PlacesDetailsStatus, DetailsAPI } from '@/features/restaurants/types'
import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { details as detailsData } from '@/data/details'
import { sleep } from '@/utils/sleep'

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
