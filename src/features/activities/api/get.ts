import { procedure } from '@/server/trpc'
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
