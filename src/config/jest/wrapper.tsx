import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

// data
import { user } from '@/data/user'

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

export const wrapper = ({
  children,
  isAuthed = true,
}: {
  children: JSX.Element
  isAuthed?: boolean
}) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        {...(isAuthed && {
          session: {
            expires: '',
            user: {
              email: user.email as string,
              id: user.id as string,
              name: user.name as string,
              image: user.image as string,
              registered_at: new Date(),
            },
          },
        })}
      >
        {children}
      </SessionProvider>
    </QueryClientProvider>
  </RecoilRoot>
)

export const setUpWrapper = (options?: { isAuthed: boolean }) => {
  return ({ children }: { children: JSX.Element }) =>
    wrapper({ children, isAuthed: options?.isAuthed })
}
