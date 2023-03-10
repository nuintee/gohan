import { REVALIDATION_THRESHOLD } from '@/config/env'
import { TRPCError } from '@trpc/server'
import { middleware } from './trpc'

// config

// Limiting
// import LRU from 'lru-cache'

// const tokenCache = new LRU<string, number>({
//   max: 500, // Max 500 users per interval
//   maxAge: 1000 * 60 * 5, // 5分,
// })

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

type Email = {
  from: string
  to: string
  title: string
  subject: string
}

export const shouldRevalidateMiddleWare = middleware(async ({ next, ctx, rawInput }) => {
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

  return next()
})
