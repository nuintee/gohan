import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '@/server/routers/_app'
import { BASE_URL } from '@/config/env'

// transformer
import superjson from 'superjson'

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${BASE_URL}/api/trpc`,
        }),
      ],
      abortOnUnmount: true,
      transformer: superjson,
    }
  },
  ssr: false,
})
