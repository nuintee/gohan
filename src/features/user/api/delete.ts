import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'

export const deleteUser = procedure.use(isAuthedMiddleWare).mutation(async ({ ctx }) => {
  const deleted = await ctx.prisma.user.delete({
    where: {
      id: ctx.session.user.id,
    },
  })
  return deleted
})
