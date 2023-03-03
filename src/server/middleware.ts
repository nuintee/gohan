import { TRPCError } from '@trpc/server'
import { middleware } from './trpc'

// config
import { API_RATE_LIMIT } from '@/config/env'

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

export const isAPIRateLimited = middleware(async ({ next, ctx }) => {
  // const { req, res } = ctx

  // const ip = req.socket.remoteAddress

  // const tokenCount = tokenCache.get(ip) || 0

  // const currentUsage = tokenCount + 1
  // tokenCache.set(ip, currentUsage)

  // const isRateLimited = currentUsage > Number(API_RATE_LIMIT || 10)

  // if (isRateLimited) {
  //   throw new TRPCError({
  //     code: 'TOO_MANY_REQUESTS',
  //     message: 'API通信回数制限を超えました。',
  //   })
  // }

  return next()
})
