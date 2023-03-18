import { wrapper } from '@/config/jest/wrapper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ActivityPanel from '../components/ActivityPanel'
import useGetUserActivities from '../hooks/useGetUserActivities'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../hooks/useGetUserActivities', () => jest.fn())

const mockedUserActivities = useGetUserActivities as jest.Mock

describe('<ActivityPanel />', () => {
  it('b39f3: show NoDataFallback when data length is 0', () => {
    mockedUserActivities.mockReturnValue({
      data: [],
      isFetching: false,
      isFetched: true,
    })

    const page = render(<ActivityPanel />, { wrapper })

    const nodataFallback = page.getByTestId('activity_panel_nodata__fallback')

    expect(nodataFallback).toBeInTheDocument()
  })
  it('b3c87: show LoadingFallback when loading', () => {
    mockedUserActivities.mockReturnValue({
      data: [],
      isFetching: true,
      isFetched: false,
    })

    const page = render(<ActivityPanel />, { wrapper })

    const nodataFallback = page.getByTestId('activity_panel_loading__fallback')

    expect(nodataFallback).toBeInTheDocument()
  })
  it('2d272: show ErrorFallback on error', () => {
    mockedUserActivities.mockReturnValue({
      data: [],
      isError: true,
      error: new Error('TEST_ACTIVITY_ERROR'),
    })

    const page = render(<ActivityPanel />, { wrapper })

    const errorFallback = page.getByTestId('error__fallback')

    expect(errorFallback).toBeInTheDocument()
  })
  it('c2e8a: sort order function result is correct', () => {
    const ORDER_DATA = [
      {
        id: 'a',
        place_id: 'TEST_PLACE_ID_0',
        name: 'a',
      },
      {
        id: 'b',
        place_id: 'TEST_PLACE_ID_1',
        name: 'b',
      },
      {
        id: 'c',
        place_id: 'TEST_PLACE_ID_2',
        name: 'c',
      },
    ]

    mockedUserActivities.mockReturnValue({
      data: ORDER_DATA,
      isFetching: false,
      isFetched: true,
    })

    const page = render(<ActivityPanel />, { wrapper })
    page.debug(page.baseElement, 200000)
  })
})
