import { IS_DEVMODE, IS_PRODMODE } from '@/config/env'
import { PlacesDetailsStatus, DetailsAPI } from '@/features/restaurants/types'
import { procedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const getActivity = procedure
  .input(
    z.object({
      place_id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const data = await ctx.prisma.activity.findUnique({
      where: {
        userId_place_id: {
          userId: ctx.session?.user.id,
          place_id: input.place_id,
        },
      },
    })

    return data
  })
