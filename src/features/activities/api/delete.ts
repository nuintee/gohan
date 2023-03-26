import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import { z } from 'zod'

export const deleteActivity = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      activityId: z.optional(z.string()),
      place_id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const data = await ctx.prisma.activity.delete({
      where: {
        userId_place_id: {
          userId: ctx.session?.user.id,
          place_id: input.place_id,
        },
      },
    })
    return data
  })
