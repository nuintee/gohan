import { procedure } from '@/server/trpc'

import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'

export const getUserActivities = procedure.query(async ({ input, ctx }) => {
  const data = await ctx.prisma.activity.findMany({ where: { userId: ctx.session?.user.id } })

  const details = await Promise.all(
    data.map(async (activity) => {
      const query = await getBareDetailsAPI({ place_id: activity.place_id })
      return { ...activity, ...query.result }
    }),
  )

  return details
})
