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

export const wrapper = ({ children, isAuthed }) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <SessionProvider {...(isAuthed && { session: { expires: '', user } })}>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  </RecoilRoot>
)

export const setUpWrapper = (options?: { isAuthed: boolean }) => {
  return ({ children }) => wrapper({ children, isAuthed: options?.isAuthed })
}
