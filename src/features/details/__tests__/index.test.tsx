import { setUpWrapper, wrapper } from '@/config/jest/wrapper'
import { _testActivity } from '@/data/activities'
import { details } from '@/data/details'
import DetailsPage from '@/pages/details/[place_id]'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@/features/activities/hooks/useGetActivity', () =>
  // add testactivity for this specific details page to ensure it's saved
  jest
    .fn()
    .mockReturnValueOnce({ isLoading: false, data: _testActivity })
    .mockReturnValueOnce({ isLoading: false, data: _testActivity })
    .mockReturnValueOnce({ isLoading: false, data: _testActivity })
    .mockReturnValueOnce({ isLoading: false, data: _testActivity }),
)

jest.mock(
  '@/features/details/hooks/useDetails',
  () =>
    jest
      .fn()
      .mockReturnValueOnce({
        isLoading: false,
        data: details.result('ChIJyfjNbFU-xxQR80zJBtL_kko'),
      })
      .mockReturnValueOnce({
        isLoading: false,
        data: details.result('ChIJyfjNbFU-xxQR80zJBtL_kko'),
      })
      .mockReturnValueOnce({
        isLoading: false,
        data: { ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'), photos: [] },
      }) // no photos
      .mockReturnValueOnce({
        isLoading: false,
        data: details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
      }), // valid photos
)

describe('/details', () => {
  it('10a2c: not showing add / update review and delete review from library when unauthed', async () => {
    // mock

    const page = render(<DetailsPage id={''} />, { wrapper: setUpWrapper({ isAuthed: false }) })

    page.debug()
    const activityMutationButton = page.queryByTestId('activity_mutation__button')
    const deleteFromLibraryDropDownItem = page.queryByText('ライブラリから削除')

    expect(activityMutationButton).not.toBeInTheDocument()
    expect(deleteFromLibraryDropDownItem).not.toBeInTheDocument()
  })
  it('b6a7f: showing add / update review and delete review from library when `activity` is saved', async () => {
    const page = render(<DetailsPage id={''} />, { wrapper })

    page.debug()
    const activityMutationButton = page.queryByTestId('activity_mutation__button')
    const deleteFromLibraryDropDownItem = page.queryByText('ライブラリから削除')

    expect(activityMutationButton).toBeInTheDocument()
    expect(deleteFromLibraryDropDownItem).toBeInTheDocument()
  })
  it('d0060: do not show tab navigation when photos length are invalid', async () => {
    const page = render(<DetailsPage id={''} />, { wrapper })

    page.debug()
    const tabPagination = page.queryByTestId('tab__navigation')

    expect(tabPagination).not.toBeInTheDocument()
  })
  it('93c45: show tab navigation when photos length are morethan 1', async () => {
    const page = render(<DetailsPage id={''} />, { wrapper })

    page.debug()
    const tabPagination = page.queryByTestId('tab__navigation')

    expect(tabPagination).toBeInTheDocument()
  })
})
