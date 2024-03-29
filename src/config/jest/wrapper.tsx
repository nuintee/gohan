import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

// data
import { user } from '@/data/user'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { AppRouter } from '@/server/routers/_app'
import { BASE_URL } from '../env'

import superjson from 'superjson'

export const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
})

const mockedTrpc = createTRPCReact<AppRouter>()

export const mockedTRPCClient = mockedTrpc.createClient({
  links: [
    httpBatchLink({
      url: `${BASE_URL}/api/trpc`,
    }),
  ],
  // @ts-ignore
  transformer: superjson,
})

export const wrapper = ({
  children,
  isAuthed = true,
  initializeRecoilState,
}: {
  children?: JSX.Element
  isAuthed?: boolean
  initializeRecoilState?: ((mutableSnapshot: MutableSnapshot) => void) | undefined
}) => (
  <RecoilRoot initializeState={initializeRecoilState}>
    <mockedTrpc.Provider client={mockedTRPCClient} queryClient={mockedQueryClient}>
      <QueryClientProvider client={mockedQueryClient}>
        <SessionProvider
          session={
            isAuthed
              ? {
                  expires: '',
                  user: {
                    email: user.email,
                    id: user.id,
                    name: user.name,
                    image: user.image,
                    registered_at: user.registered_at,
                    emailVerified: user.emailVerified,
                  },
                }
              : null
          }
        >
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </mockedTrpc.Provider>
  </RecoilRoot>
)

export const setUpWrapper = (options?: Parameters<typeof wrapper>[0]) => {
  return ({ children }: { children: JSX.Element }) => wrapper({ children, ...options })
}
