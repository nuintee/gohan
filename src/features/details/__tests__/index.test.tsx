import { setUpWrapper, wrapper } from '@/config/jest/wrapper'
import { _testActivity } from '@/data/activities'
import { details } from '@/data/details'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import DetailsPage from '@/pages/details/[place_id]'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import useDetails from '../hooks/useDetails'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@/features/activities/hooks/useGetActivity', () => jest.fn())

jest.mock('@/features/details/hooks/useDetails', () => jest.fn())

const mockGetActivity = useGetActivity as jest.Mock
const mockGetDetails = useDetails as jest.Mock

describe('/details', () => {
  const PLACE_ID = 'ChIJyfjNbFU-xxQR80zJBtL_kko'

  it('10a2c: not showing add / update review and delete review from library when unauthed', async () => {
    // mock
    mockGetActivity.mockReturnValue({ isLoading: false, data: _testActivity })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(PLACE_ID),
    })

    const page = render(<DetailsPage id={''} />, { wrapper: setUpWrapper({ isAuthed: false }) })

    const activityMutationButton = page.queryByTestId('activity_mutation__button')
    const deleteFromLibraryDropDownItem = page.queryByText('ライブラリから削除')

    expect(activityMutationButton).not.toBeInTheDocument()
    expect(deleteFromLibraryDropDownItem).not.toBeInTheDocument()
  })
  it('b6a7f: showing add / update review and delete review from library when `activity` is saved', async () => {
    mockGetActivity.mockReturnValue({ isLoading: false, data: _testActivity })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(PLACE_ID),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })

    const activityMutationButton = page.queryByTestId('activity_mutation__button')
    const deleteFromLibraryDropDownItem = page.queryByText('ライブラリから削除')

    expect(activityMutationButton).toBeInTheDocument()
    expect(deleteFromLibraryDropDownItem).toBeInTheDocument()
  })
  it('d0060: do not show tab navigation when photos length are invalid', async () => {
    mockGetActivity.mockReturnValue({ isLoading: false, data: _testActivity })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: { ...details.result(PLACE_ID), photos: [] },
    })

    const page = render(<DetailsPage id={''} />, { wrapper })

    const tabPagination = page.queryByTestId('tab__navigation')

    expect(tabPagination).not.toBeInTheDocument()
  })
  it('93c45: show tab navigation when photos length are morethan 1', async () => {
    mockGetActivity.mockReturnValue({ isLoading: false, data: _testActivity })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(PLACE_ID),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })

    const tabPagination = page.queryByTestId('tab__navigation')

    expect(tabPagination).toBeInTheDocument()
  })
  it('8f9a4: show error Fallback on details error', async () => {
    const ERROR_TEXT = 'Invalid Details ID'
    mockGetActivity.mockReturnValue({ isLoading: false, data: _testActivity })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error(ERROR_TEXT),
      data: details.result(''),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })

    const errorFallback = page.queryByTestId('error__fallback')
    const errorText = page.queryByText(ERROR_TEXT)

    expect(errorFallback).toBeInTheDocument()
    expect(errorText).toBeInTheDocument()
  })
  it('03733: show error Fallback on activity error', async () => {
    const ERROR_TEXT = 'Invalid Activity'
    mockGetActivity.mockReturnValue({
      isLoading: false,
      data: _testActivity,
      isError: true,
      error: new Error(ERROR_TEXT),
    })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(''),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })

    const errorFallback = page.queryByTestId('error__fallback')
    const errorText = page.queryByText(ERROR_TEXT)

    expect(errorFallback).toBeInTheDocument()
    expect(errorText).toBeInTheDocument()
  })
  it('890f6: show `評価を追加 ✨` when reviewStatus is NEW or not saved', () => {
    const ACTIVITY_MUTATION_TEXT = '評価を追加 ✨'
    mockGetActivity.mockReturnValue({
      isLoading: false,
      data: { ..._testActivity, reviewStatus: 'NEW' },
    })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(PLACE_ID),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })
    const mutationButton = page.getByTestId('activity_mutation__button')

    expect(mutationButton.innerHTML).toMatch(ACTIVITY_MUTATION_TEXT)
  })
  it('c7b49: show `評価を変更` when reviewStatus is saved and not `NEW`', () => {
    const ACTIVITY_MUTATION_TEXT = '評価を変更'
    mockGetActivity.mockReturnValue({
      isLoading: false,
      data: { ..._testActivity, reviewStatus: 'BAD' },
    })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: details.result(PLACE_ID),
    })

    const page = render(<DetailsPage id={''} />, { wrapper })
    const mutationButton = page.getByTestId('activity_mutation__button')

    expect(mutationButton.innerHTML).toMatch(ACTIVITY_MUTATION_TEXT)
  })
  it('c7b49: show `評価を変更` when reviewStatus is saved and not `NEW`', () => {
    mockGetActivity.mockReturnValue({
      isLoading: false,
      data: { ..._testActivity, reviewStatus: 'BAD' },
    })
    mockGetDetails.mockReturnValue({
      isLoading: false,
      data: {
        ...details.result(PLACE_ID),
        price_level: undefined,
        opening_hours: undefined,
        user_ratings_total: undefined,
      },
    })

    const page = render(<DetailsPage id={PLACE_ID} />, { wrapper })
    const descriptiveSection = page.queryByTestId('details_descriptive__group')

    page.debug()

    expect(descriptiveSection).toBeInTheDocument()
  })
})
