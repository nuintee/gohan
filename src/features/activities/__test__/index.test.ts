import { renderHook } from '@testing-library/react'
import { Session } from 'next-auth'
// import useActivities from '../hooks'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import 'whatwg-fetch'

// Types
import { AddActivityProps } from '@/features/activities/schemas/addActivity.schema'

const _test_activityData: AddActivityProps = {
  user_id: '5a70cabc-919b-48db-867d-c02a6e988f83',
  is_liked: false,
  place_id: '_TEST_PLACE_ID',
}

// beforeAll(async () => {
//   // add test data
//   renderHook(async () => await useActivities().add(_test_activityData))
// })

// afterAll(async () => {
//   // remove test data
//   renderHook(async () => await useActivities().remove(_test_activityData.place_id as string))
// })

describe('desc', () => {
  test('test', () => {
    expect().toBeUndefined()
  })
})

// describe('useActivities', () => {
//   test('GET with success', async () => {
//     const { result } = renderHook(() => useActivities().get(_test_activityData.place_id as string))
//     const response = await result.current
//     expect(response.data).toMatchObject(_test_activityData)
//   })
//   test('GET with error', async () => {
//     const { result } = renderHook(() => useActivities().get('_PLACE_ID_')) // id that doesn't exists
//     const data = await result.current
//     expect(data?.code).not.toBe(200)
//   })
// })
