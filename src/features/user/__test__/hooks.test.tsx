import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// hooks
import useUserMutation from '../hooks/useUpdateUser'
import useUserQuery from '../hooks/useGetUser'
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
  <SessionProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </SessionProvider>
)

describe('useUserQuery', () => {
  test('Success', async () => {
    const { result } = renderHook(() => useUserQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isSuccess).toBe(true)
  }),
    test('Toast on Error', async () => {
      const { result } = renderHook(() => useUserQuery(), { wrapper })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })
      expect(useToast.error).toHaveBeenCalled()
    })
})
