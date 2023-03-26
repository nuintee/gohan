import { wrapper } from '@/config/jest/wrapper'
import { SORT_ENUM } from '@/constants/sort'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import ActivityPanel from '../components/ActivityPanel'
import useGetUserActivities from '../hooks/useGetUserActivities'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../hooks/useGetUserActivities', () => jest.fn())

const mockedUserActivities = useGetUserActivities as jest.Mock

const ORDER_DATA = [
  {
    id: 'TEST_ID_A',
    place_id: 'TEST_PLACE_ID_0',
    name: 'TEST_NAME_A',
    reviewStatus: 'NEW',
  },
  {
    id: 'TEST_ID_B',
    place_id: 'TEST_PLACE_ID_1',
    name: 'TEST_NAME_B',
    reviewStatus: 'GOOD',
  },
  {
    id: 'TEST_ID_C',
    place_id: 'TEST_PLACE_ID_2',
    name: 'TEST_NAME_C',
    reviewStatus: 'OK',
  },
]

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
  it('c2e8a: sort order function result is correct', async () => {
    mockedUserActivities.mockReturnValue({
      data: ORDER_DATA,
      isFetching: false,
      isFetched: true,
    })

    const page = render(<ActivityPanel />, { wrapper })

    const nameSortButtonASC = page.getByTestId('dropdown_item_name_ASC')
    const nameSortButtonDESC = page.getByTestId('dropdown_item_name_DESC')

    // ASC
    ORDER_DATA.sort((a, b) => SORT_ENUM.ASC.sortFn(a, b, 'name') || 1).forEach((data, index) => {
      const target = page.getByTestId(`activity_panel__content_order_${index}`)
      const text = target.querySelector('h1')?.innerHTML
      expect(text).toBe(data.name)
    })

    // Triggers DESC sort
    fireEvent.click(nameSortButtonDESC)

    await waitFor(() => {
      // DESC
      ORDER_DATA.sort((a, b) => SORT_ENUM.DESC.sortFn(a, b, 'name') || 1).forEach((data, index) => {
        const target = page.getByTestId(`activity_panel__content_order_${index}`)
        const text = target.querySelector('h1')?.innerHTML
        expect(text).toBe(data.name)
      })
    })

    // Triggers ASC sort
    fireEvent.click(nameSortButtonASC)

    await waitFor(() => {
      // DESC
      ORDER_DATA.sort((a, b) => SORT_ENUM.ASC.sortFn(a, b, 'name') || 1).forEach((data, index) => {
        const target = page.getByTestId(`activity_panel__content_order_${index}`)
        const text = target.querySelector('h1')?.innerHTML
        expect(text).toBe(data.name)
      })
    })
  })
  it('c32ec: filter function result is correct', async () => {
    mockedUserActivities.mockReturnValue({
      data: ORDER_DATA,
      isFetching: false,
      isFetched: true,
    })

    const page = render(<ActivityPanel />, { wrapper })

    // All data contents are rendered
    ORDER_DATA.forEach((_data, index) => {
      const target = page.getByTestId(`activity_panel__content_order_${index}`)
      expect(target).toBeInTheDocument()
    })

    const allSortButton = page.getByTestId('dropdown_item_filter_ALL')
    const goodSortButton = page.getByTestId('dropdown_item_filter_GOOD')
    const okSortButton = page.getByTestId('dropdown_item_filter_OK')
    const badSortButton = page.getByTestId('dropdown_item_filter_BAD')

    // triggers GOOD sort
    fireEvent.click(goodSortButton)

    await waitFor(() => {
      ORDER_DATA.forEach((v) => {
        if (v.reviewStatus === 'GOOD') {
          expect(page.queryByText(v.name)).toBeInTheDocument()
        } else {
          expect(page.queryByText(v.name)).not.toBeInTheDocument()
        }
      })
    })

    // triggers OK sort
    fireEvent.click(okSortButton)

    await waitFor(() => {
      ORDER_DATA.forEach((v) => {
        if (v.reviewStatus === 'OK') {
          expect(page.queryByText(v.name)).toBeInTheDocument()
        } else {
          expect(page.queryByText(v.name)).not.toBeInTheDocument()
        }
      })
    })

    // triggers OK sort
    fireEvent.click(badSortButton)

    await waitFor(() => {
      ORDER_DATA.forEach((v) => {
        if (v.reviewStatus === 'BAD') {
          expect(page.queryByText(v.name)).toBeInTheDocument()
        } else {
          expect(page.queryByText(v.name)).not.toBeInTheDocument()
        }
      })
    })

    // triggers ALL sort
    fireEvent.click(allSortButton)

    await waitFor(() => {
      ORDER_DATA.forEach((v) => {
        expect(page.queryByText(v.name)).toBeInTheDocument()
      })
    })
  })
})
