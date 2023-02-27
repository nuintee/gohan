import { isAuthedMiddleWare } from '@/server/middleware'
import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'

export const deleteUser = procedure.use(isAuthedMiddleWare).mutation(async ({ ctx }) => {
  const deleted = await prisma.user.delete({
    where: {
      id: ctx.session.user.id,
    },
  })
  return deleted
})
