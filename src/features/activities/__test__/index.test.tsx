import { renderHook, waitFor } from '@testing-library/react'
import useActivities from '../hooks/index'
import 'whatwg-fetch'

// Types
import { AddActivityProps } from '@/features/activities/schemas/addActivity.schema'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

// data
import { user } from '@/data/user'

// config
import { setUpWrapper } from '@/config/jest/wrapper'
const wrapper = setUpWrapper({ isAuthed: true })

const _test_activityData: AddActivityProps = {
  userId: user.id,
  is_liked: false,
  place_id: '_TEST_PLACE_ID',
}

const _updateField = {
  is_liked: true,
}

describe('useActivities', () => {
  // POST
  test('POST with success', async () => {
    const { result } = renderHook(() => useActivities().add(_test_activityData), { wrapper })
    const added = await result.current.mutateAsync()
    await waitFor(async () => {
      expect(added).toMatchObject(_test_activityData)
    })
  })
  test('POST with error', async () => {
    // Already existing id
    const { result } = renderHook(() => useActivities().add(_test_activityData), { wrapper })
    await waitFor(async () => {
      expect(result.current.status).not.toBe(200)
    })
  })

  // GET
  test('GET with success', async () => {
    const { result } = renderHook(
      () => useActivities().get(_test_activityData.place_id as string),
      {
        wrapper,
      },
    )
    await waitFor(() => {
      if (!result.current.isSuccess) throw new Error('Wait')
      expect(result.current.data).toMatchObject(_test_activityData)
    })
  })
  test('GET with error', async () => {
    const { result } = renderHook(() => useActivities().get(''), {
      wrapper,
    })
    await waitFor(() => {
      expect(result.current.status).not.toBe(200)
    })
  })

  test('GET all with success', async () => {
    const { result } = renderHook(() => useActivities().getUserAll(), {
      wrapper,
    })
    await waitFor(() => {
      if (!result.current.isSuccess) throw new Error('Wait')
      const hasUserId = result.current.data.filter((activity) => activity.userId === user.id)
      const isAllUsersData = result.current.data.length === hasUserId.length
      expect(isAllUsersData).toBe(true)
    })
  })
  test('GET all with error', async () => {
    const { result } = renderHook(() => useActivities().getUserAll(), {
      wrapper,
    })
    await waitFor(() => {
      expect(result.current.status).not.toBe(200)
    })
  })

  // PATCH
  test('PATCH with success', async () => {
    const { result } = renderHook(
      () => useActivities().update(_test_activityData.place_id as string, _updateField),
      {
        wrapper,
      },
    )
    const updated = await result.current.mutateAsync()
    await waitFor(async () => {
      expect(updated).toMatchObject({ ..._test_activityData, ..._updateField })
    })
  })

  test('PATCH with error', async () => {
    const { result } = renderHook(() => useActivities().update(''), {
      wrapper,
    })
    await waitFor(() => {
      expect(result.current.status).not.toBe(200)
    })
  })

  // DELETE
  test('DELETE with error', async () => {
    const { result } = renderHook(() => useActivities().remove(''), {
      wrapper,
    })
    await waitFor(() => {
      expect(result.current.status).not.toBe(200)
    })
  })

  test('DELETE with success', async () => {
    const { result } = renderHook(
      () => useActivities().remove(_test_activityData.place_id as string),
      { wrapper },
    )
    const removed = await result.current.mutateAsync()
    await waitFor(async () => {
      expect(removed).toMatchObject({ ..._test_activityData, ..._updateField })
    })
  })
})
