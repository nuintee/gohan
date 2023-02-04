import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import 'whatwg-fetch'

// data
import geolocation from '@/data/geolocation.json'
import { details } from '@/data/details'
import { user } from '@/data/user'

// hooks
import useGetRestaurants from '../hooks/useRestaurants/useGetRestaurants'
import useClearRestaurant from '../hooks/useRestaurants/useClearRestaurant'
import useRestaurantDetails from '../hooks/useRestaurantDetails'
import { RecoilRoot } from 'recoil'
import { server } from '@/mocks/server'
import { handlers } from '@/mocks/handlers'

// config
import { setUpWrapper } from '@/config/jest/wrapper'
const wrapper = setUpWrapper({ isAuthed: true })

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

describe('clearRestaurants', () => {
  test('to reset restaurants state', async () => {
    const { result } = renderHook(() => useClearRestaurant(), { wrapper })

    await result.current.mutateAsync()

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
  })
})

describe('getRestaurantDetail', () => {
  const PLACE_ID = 'ChIJzdIWCP2GqkAR4wCobfmZAvo'

  test('to return restaurants details', async () => {
    const { result } = renderHook(() => useRestaurantDetails({ place_id: PLACE_ID }), { wrapper })

    const refetched = await result.current.refetch()

    await waitFor(() => {
      expect(refetched.isSuccess).toBe(true)
    })

    console.log(refetched.data)
    expect(refetched.data.result.place_id).toBe(PLACE_ID)
  })
})
