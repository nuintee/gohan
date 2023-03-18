import { wrapper } from '@/config/jest/wrapper'
import { details } from '@/data/details'
import { DetailsAPI } from '@/features/restaurants/types'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import DetailsDescriptiveGroup from '../components/ui/DetailsDescriptiveGroup'

describe('<DetailsDescriptiveGroup />', () => {
  const PLACE_ID = 'ChIJyfjNbFU-xxQR80zJBtL_kko'
  it('7cc65: [KEY_FEATURES] All Key features chips will be renderd when there are all defined', () => {
    const page = render(
      <DetailsDescriptiveGroup
        data={{
          ...details.result(PLACE_ID),
          price_level: 3,
          opening_hours: [],
          user_ratings_total: 10,
        }}
      />,
      { wrapper },
    )
    const priceLevelChip = page.queryByTestId('descriptive_price_level__chip')
    const openingHoursChip = page.queryByTestId('descriptive_opening_hours__chip')
    const userRatingsTotal = page.queryByTestId('descriptive_user_ratings_total__chip')

    expect(priceLevelChip).toBeInTheDocument()
    expect(openingHoursChip).toBeInTheDocument()
    expect(userRatingsTotal).toBeInTheDocument()
  })
  it('528fd: [KEY_FEATURES] price_level will not be rendered when undefined', () => {
    const page = render(
      <DetailsDescriptiveGroup
        data={{
          ...details.result(PLACE_ID),
          price_level: undefined,
        }}
      />,
      { wrapper },
    )
    const priceLevelChip = page.queryByTestId('descriptive_price_level__chip')

    expect(priceLevelChip).not.toBeInTheDocument()
  })
  it('09657: [KEY_FEATURES] opening_hours will not be rendered when undefined', () => {
    const page = render(
      <DetailsDescriptiveGroup
        data={{
          ...details.result(PLACE_ID),
          opening_hours: undefined,
        }}
      />,
      { wrapper },
    )
    const priceLevelChip = page.queryByTestId('descriptive_opening_hours__chip')

    expect(priceLevelChip).not.toBeInTheDocument()
  })
  it('a4a48: [KEY_FEATURES] user_ratings_total will not be rendered when undefined', () => {
    const page = render(
      <DetailsDescriptiveGroup
        data={
          {
            ...details.result(PLACE_ID),
            user_ratings_total: undefined,
          } as DetailsAPI['result']
        }
        isLoading={false}
      />,
      { wrapper },
    )
    const priceLevelChip = page.queryByTestId('descriptive_user_ratings_toal__chip')

    expect(priceLevelChip).not.toBeInTheDocument()
  })
})
