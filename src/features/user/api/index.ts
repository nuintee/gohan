import { procedure } from '@/server/trpc'
import prisma from '@/libs/prisma'
import { z } from 'zod'
import { isAuthedMiddleWare } from '@/server/middleware'

export const getUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const data = await prisma.user.findUnique({ where: { id: input.userId } })
    return data
  })

export const updateUser = procedure
  .use(isAuthedMiddleWare)
  .input(
    z.object({
      userId: z.string(),
      payload: z.object({
        name: z.string(),
      }),
    }),
  )
  .mutation(async ({ input }) => {
    const data = await prisma.user.update({
      where: {
        id: input.userId,
      },
      data: input.payload,
    })
    return data
  })

export const deleteUser = procedure.use(isAuthedMiddleWare).mutation(async ({ ctx }) => {
  const deleted = await prisma.user.delete({
    where: {
      id: ctx.session.user.id,
    },
  })
  return deleted
})
