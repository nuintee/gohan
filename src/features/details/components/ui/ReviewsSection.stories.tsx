import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewsSection from './ReviewsSection'

// data
import { details } from '@/data/details'
import { REVIEWS } from '@/data/_reviews'
import { ResultsEntity } from '@/features/restaurants/types'

const DATA = {
  ...details.result('ChIJyfjNbFU-xxQR80zJBtL_kko'),
  reviews: REVIEWS,
}

export default {
  title: 'Features/Details/ReviewSection',
  component: ReviewsSection,
} as ComponentMeta<typeof ReviewsSection>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ReviewsSection> = (args) => <ReviewsSection {...args} />

export const Default = Template.bind({})

Default.args = {
  data: DATA as ResultsEntity,
}
