import { TRPCError } from '@trpc/server'
import { middleware } from './trpc'

// Limiting
import LRU from 'lru-cache'
import requestIp from 'request-ip'
import rateLimit from 'express-rate-limit'

type CheckLimitFunc = () => {
  check: (res: NextApiResponse, limit: number, ipAddress: string) => Promise<void>
}
export const LimitChecker: CheckLimitFunc = () => {
  const tokenCache = new LRU<string, number>({
    max: 500, // Max 500 users per interval
    maxAge: 1000 * 60 * 5, // 5分,
  })

  return {
    check: (res, limit, token): Promise<void> =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || 0

        const currentUsage = tokenCount + 1
        tokenCache.set(token, currentUsage)

        const isRateLimited = currentUsage > limit
        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - currentUsage)

        return isRateLimited ? reject('Too Many Requests') : resolve()
      }),
  }
}

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

export const isAPIRateLimited = middleware(rateLimit({ windowMs: 60 * 1000, max: 1 }))
