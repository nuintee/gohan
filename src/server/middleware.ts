import { REVALIDATION_THRESHOLD } from '@/config/env'
import { isObject } from '@/utils/typeguards'
import { Report } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { middleware } from './trpc'

export const isAuthedMiddleWare = middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'このアクションを行うには認証をして下さい。',
    })
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  })
})

export const shouldRevalidateMiddleWare = middleware(async ({ next, ctx, rawInput }) => {
  if (isObject<Pick<Report, 'body'>>(rawInput)) {
    const count = await ctx.prisma.report.count({
      where: {
        request_type: 'REVALIDATE',
        body: {
          equals: rawInput.body,
        },
      },
    })

    if (count + 1 >= REVALIDATION_THRESHOLD) {
      await ctx.prisma.report.deleteMany({
        where: {
          body: {
            equals: rawInput.body,
          },
        },
      })

      await ctx.res.revalidate(`/details/${rawInput.body}`)
    }
  }

  return next()
})
