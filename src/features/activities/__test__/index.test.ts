import { renderHook } from '@testing-library/react'
import { Session } from 'next-auth'
import useActivities from '../hooks'
import { SessionProvider } from 'next-auth/react'

describe('useHoge Custom Hooks Test', () => {
  test('Custom Hooks の返り値は hoge になること', () => {
    const { result } = renderHook(() => useActivities().get(''), {
      wrapper: SessionProvider,
    })
    console.log(result)
  })
})
