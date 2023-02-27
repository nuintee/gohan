import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { getBarePlacesAPI } from '@/features/restaurants/utils/getBarePlacesAPI'
import { statusMapper } from '@/features/restaurants/utils/statusMapper'
import { procedure } from '@/server/trpc'
import { TRPCClientError } from '@trpc/client'
import { z } from 'zod'

export const getDetails = procedure
  .input(
    z.object({
      place_id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const data = await getBareDetailsAPI({ place_id: input.place_id })

    let activity
    if (ctx.session?.user) {
      activity = await ctx.prisma.activity.findUnique({
        where: {
          userId_place_id: {
            userId: ctx.session.user.id,
            place_id: input.place_id,
          },
        },
      })
    }

    if (data.status === 'OK') {
      return { ...data.result, ...activity }
    } else {
      throw new TRPCClientError(statusMapper(data.status), { cause: new Error(data.status) })
    }
  })
