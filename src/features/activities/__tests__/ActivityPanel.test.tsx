import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render, renderHook, waitFor } from '@testing-library/react'
import ActivityPanel from '../components/ActivityPanel'
import useGetUserActivities from '../hooks/useGetUserActivities'

describe('<ActivityPanel />', () => {
  it('b39f3: render No Data Fallback on 0 items', async () => {
    const hook = renderHook(() => useGetUserActivities(), { wrapper })

    await waitFor(() => hook.result.current.isSuccess)

    const container = render(<ActivityPanel />, { wrapper })

    container.debug()
  })
})
