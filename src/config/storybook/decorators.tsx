import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'

import { AppRouter } from '@/server/routers/_app'
import { BASE_URL } from '../env'
import superjson from 'superjson'

const queryClient = new QueryClient()

const mockedTrpc = createTRPCReact<AppRouter>()

const trpcClient = mockedTrpc.createClient({
  links: [
    httpBatchLink({
      url: `${BASE_URL}/api/trpc`,
    }),
  ],
  // @ts-ignore
  transformer: superjson,
})

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <mockedTrpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Story />
          </SessionProvider>
        </QueryClientProvider>
      </mockedTrpc.Provider>
    </RecoilRoot>
  ),
]
