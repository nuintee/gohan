import { renderHook } from '@testing-library/react'
import { Session } from 'next-auth'
import useActivities from '../hooks'
import { SessionProvider, signIn } from 'next-auth/react'
import 'whatwg-fetch'

describe('useHoge Custom Hooks Test', () => {
  test('Custom Hooks の返り値は hoge になること', async () => {
    const { result } = renderHook(() => useActivities().getUserAll(), {
      wrapper: SessionProvider,
    })
    const data = await result.current
    console.log(data)
  })
})
