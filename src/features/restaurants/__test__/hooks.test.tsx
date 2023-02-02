import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// data
import geolocation from '@/data/geolocation.json'

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

jest.useRealTimers()

describe('getRestaurants', () => {
  test('to return random restaurant properly', async () => {
    const { result } = renderHook(
      () =>
        useGetRestaurants({
          coords: {
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,
          },
        }),
      {
        wrapper,
      },
    )

    const refetched = await result.current.refetch()

    await waitFor(() => {
      expect(refetched.isSuccess).toBe(true)
    })

    expect(refetched.data).toBeDefined()
  })

  test('to throw error on invalid latitude', async () => {
    const { result } = renderHook(
      () =>
        useGetRestaurants({
          coords: {
            latitude: undefined,
            longitude: undefined,
          },
        }),
      {
        wrapper,
      },
    )

    const refetched = await result.current.refetch()

    expect(refetched.isError).toBe(true)
  })
})
