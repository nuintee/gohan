import { renderHook } from '@testing-library/react'
import useActivities from '../hooks'

describe('useHoge Custom Hooks Test', () => {
  test('Custom Hooks の返り値は hoge になること', () => {
    const { result } = renderHook(() => useActivities().get(''))
    console.log(result)
  })
})
