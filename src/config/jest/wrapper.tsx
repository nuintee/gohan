import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

// data
import { user } from '@/data/user'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { AppRouter } from '@/server/routers/_app'
import { BASE_URL } from '../env'

import superjson from 'superjson'

const queryClient = new QueryClient({
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

const trpcClient = mockedTrpc.createClient({
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
  children: JSX.Element
  isAuthed?: boolean
  initializeRecoilState?: ((mutableSnapshot: MutableSnapshot) => void) | undefined
}) => (
  <RecoilRoot initializeState={initializeRecoilState}>
    <mockedTrpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={
            isAuthed
              ? {
                  expires: '',
                  user: {
                    email: user.email as string,
                    id: user.id as string,
                    name: user.name as string,
                    image: user.image as string,
                    registered_at: new Date(),
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

export const setUpWrapper = (options?: { isAuthed: boolean }) => {
  return ({ children }: { children: JSX.Element }) =>
    wrapper({ children, isAuthed: options?.isAuthed })
}
