import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Story />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  ),
]
