import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ActivityPanel from '../components/ActivityPanel'
import useGetUserActivities from '../hooks/useGetUserActivities'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../hooks/useGetUserActivities', () => jest.fn())

const mockedUserActivities = useGetUserActivities as jest.Mock

describe('<ActivityPanel />', () => {
  it('b39f3: show Fallback on data length 0', () => {
    mockedUserActivities.mockReturnValue({
      data: [],
      isFetching: false,
      isFetched: true,
    })

    const page = render(<ActivityPanel />, { wrapper })

    const nodataFallback = page.getByTestId('activity_panel_nodata__fallback')

    expect(nodataFallback).toBeInTheDocument()
  })
})
