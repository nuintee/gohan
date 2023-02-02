import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// data
import { user } from '@/data/user'

// hooks
import useGetRestaurants from '../hooks/useRestaurants/useGetRestaurants'
import useClearRestaurant from '../hooks/useRestaurants/useClearRestaurant'
import useRestaurantDetails from '../hooks/useRestaurantDetails'
import { RecoilRoot } from 'recoil'

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
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  </RecoilRoot>
)

describe('hooks/restaurants', () => {
  // test('getRestaurants', async () => {
  //   const { result } = renderHook(() => useGetRestaurants()), { wrapper })
  //   await waitFor(() => {
  //     expect(result.current.isSuccess).toBe(true)
  //   })
  //   expect(result.current.data).toMatchObject(user)
  //   })
  // test('updateUser', async () => {
  //   const UPDATE_NAME = 'UPDATED_USER_NAME'
  //   const { result } = renderHook(() => useUpdateUser(), { wrapper })
  //   await result.current.mutateAsync({
  //     name: UPDATE_NAME,
  //   })
  //   await waitFor(() => {
  //     expect(result.current.isSuccess).toBe(true)
  //   })
  //   expect(result.current.data.name).toBe(UPDATE_NAME)
  // })
  test('getRestaurants', async () => {
    const { result } = renderHook(() => useGetRestaurants(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(result.current.data).toBeDefined()
  })
})
