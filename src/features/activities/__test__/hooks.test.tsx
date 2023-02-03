import { renderHook, waitFor } from '@testing-library/react'

// hooks
import useAddActivity from '../hooks/useAddActivity'
import usePatchActivity from '../hooks/usePatchActivity'

import { setUpWrapper } from '@/config/jest/wrapper'
const wrapper = setUpWrapper({ isAuthed: true })

import { AddActivityProps } from '../schemas/addActivity.schema'

// data
import { user } from '@/data/user'
import useGetActivity from '../hooks/useGetActivity'

const _test_activityData: Required<AddActivityProps> = {
  id: 'd30b89de-6743-4d51-b6f0-b7865926b8d6',
  userId: user.id,
  is_liked: false,
  place_id: '_TEST_PLACE_ID',
}

describe('hooks/activities', () => {
  const UPDATED_ACTIVITY = { ..._test_activityData, is_liked: !_test_activityData.is_liked }

  describe('useAddActivity', () => {
    test('to add activity succesfully', async () => {
      const { result } = renderHook(() => useAddActivity({}), { wrapper })

      await result.current.mutateAsync(_test_activityData)

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(result.current.data).toMatchObject(_test_activityData)
    })
  })

  describe('usePatchActivity', () => {
    test('to update activity succesfully', async () => {
      const { result } = renderHook(() => usePatchActivity({ activityId: _test_activityData.id }), {
        wrapper,
      })

      await result.current.mutateAsync({ is_liked: UPDATED_ACTIVITY.is_liked })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(result.current.data).toMatchObject(UPDATED_ACTIVITY)
    })
  })

  describe('useGetActivity', () => {
    test('to get activity succesfully', async () => {
      const { result } = renderHook(() => useGetActivity({ activityId: _test_activityData.id }), {
        wrapper,
      })

      const refetched = await result.current.refetch()

      await waitFor(() => {
        expect(refetched.isSuccess).toBe(true)
      })

      expect(refetched.data).toMatchObject(UPDATED_ACTIVITY)
    })
  })
})
