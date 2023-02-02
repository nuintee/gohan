import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// data
import { user } from '@/data/user'

// hooks
import useGetUser from '../hooks/useGetUser'
import useUpdateUser from '../hooks/useUpdateUser'
import useToast from '@/libs/react-toastify'

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

const wrapper = ({ children }) => (
  <SessionProvider
    session={{
      expires: '',
      user,
    }}
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </SessionProvider>
)

describe('useUserQuery', () => {
  test('getUser', async () => {
    const { result } = renderHook(() => useGetUser(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toBeDefined()
  }),
    test('updateUser', async () => {
      const { result } = renderHook(() => useUpdateUser(), { wrapper })

      const mutated = await result.current.mutate({})

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })
    })
})
