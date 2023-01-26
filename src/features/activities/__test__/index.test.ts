import { renderHook } from '@testing-library/react'
import { Session } from 'next-auth'
import useActivities from '../hooks'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import 'whatwg-fetch'

// Types
import { AddActivityProps } from '@/features/activities/schemas/addActivity.schema'

const _test_activityData: AddActivityProps = {
  user_id: '5a70cabc-919b-48db-867d-c02a6e988f83',
  is_liked: false,
  place_id: 'Chugeaog',
}

beforeAll(async () => {
  // add test data
  renderHook(async () => await useActivities().add(_test_activityData))
})

afterAll(async () => {
  // remove test data
  renderHook(async () => await useActivities().remove(_test_activityData.place_id as string))
})

describe('useActivities', () => {
  test('GET with success', async () => {
    const { result } = renderHook(() => useActivities().get(_test_activityData.place_id as string))
    const data = await result.current
    expect(data).toMatchObject(_test_activityData)
  })
})
