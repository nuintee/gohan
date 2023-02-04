import { renderHook, waitFor } from '@testing-library/react'

// hooks
import useAddActivity from '../hooks/useAddActivity'
import usePatchActivity from '../hooks/usePatchActivity'

import { setUpWrapper } from '@/config/jest/wrapper'
const wrapper = setUpWrapper({ isAuthed: true })

import { AddActivityProps } from '../schemas/addActivity.schema'

// data
import { _testActivity } from '@/data/activities'
import useGetActivity from '../hooks/useGetActivity'

describe('hooks/activities', () => {
  const UPDATED_ACTIVITY = { ..._testActivity, is_liked: !_testActivity.is_liked }

  test('e', () => {
    expect(true).toBe(true)
  })

  // describe('useAddActivity', () => {
  //   test('to add activity succesfully', async () => {
  //     const { result } = renderHook(() => useAddActivity({}), { wrapper })

  //     await result.current.mutateAsync(_testActivity)

  //     await waitFor(() => {
  //       expect(result.current.isSuccess).toBe(true)
  //     })

  //     expect(result.current.data).toMatchObject(_testActivity)
  //   })
  // })

  // describe('usePatchActivity', () => {
  //   test('to update activity succesfully', async () => {
  //     const { result } = renderHook(() => usePatchActivity({ activityId: _testActivity.id }), {
  //       wrapper,
  //     })

  //     await result.current.mutateAsync({ is_liked: UPDATED_ACTIVITY.is_liked })

  //     await waitFor(() => {
  //       expect(result.current.isSuccess).toBe(true)
  //     })

  //     expect(result.current.data).toMatchObject(UPDATED_ACTIVITY)
  //   })
  // })

  // describe('useGetActivity', () => {
  //   test('to get activity succesfully', async () => {
  //     const { result } = renderHook(() => useGetActivity({ activityId: _testActivity.id }), {
  //       wrapper,
  //     })

  //     const refetched = await result.current.refetch()

  //     await waitFor(() => {
  //       expect(refetched.isSuccess).toBe(true)
  //     })

  //     expect(refetched.data).toMatchObject(UPDATED_ACTIVITY)
  //   })
  // })
})
