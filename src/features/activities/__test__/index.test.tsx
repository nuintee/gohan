import { renderHook, waitFor } from '@testing-library/react'
import { Session } from 'next-auth'
// import useActivities from '../hooks'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import useActivities from '../hooks/index'
import 'whatwg-fetch'

// Types
import { AddActivityProps } from '@/features/activities/schemas/addActivity.schema'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const _test_activityData: AddActivityProps = {
  user_id: '5a70cabc-919b-48db-867d-c02a6e988f83',
  is_liked: false,
  place_id: '_TEST_PLACE_ID',
}

beforeAll(async () => {
  // add test data
  const { result } = renderHook(() => useActivities().add(_test_activityData), { wrapper })
  await waitFor(() => {
    result.current.mutate()
  })
})

afterAll(async () => {
  // add test data
  const { result } = renderHook(
    () => useActivities().remove(_test_activityData.place_id as string),
    { wrapper },
  )
  await waitFor(() => {
    result.current.mutate()
  })
})

describe('useActivities', () => {
  test('GET with success', async () => {
    const { result } = renderHook(
      () => useActivities().get(_test_activityData.place_id as string),
      {
        wrapper,
      },
    )
    // await waitFor(() => {
    //   if (!result.current.isSuccess) throw new Error('Wait')
    //   console.log(result.current.data)
    // })
  })
})
