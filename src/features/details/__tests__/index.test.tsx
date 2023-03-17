import { setUpWrapper, wrapper } from '@/config/jest/wrapper'
import { _testActivity } from '@/data/activities'
import { details } from '@/data/details'
import DetailsPage from '@/pages/details/[place_id]'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@/features/activities/hooks/useGetActivity', () =>
  // add testactivity for this specific details page to ensure it's saved
  jest.fn().mockReturnValue({ isLoading: false, data: _testActivity }),
)

jest.mock('@/features/details/hooks/useDetails', () =>
  jest.fn().mockReturnValue({ isLoading: false, data: details.result('') }),
)

describe('/details', () => {
  it('10a2c: not showing add / update review and delete review from library when unauthed', async () => {
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
})
