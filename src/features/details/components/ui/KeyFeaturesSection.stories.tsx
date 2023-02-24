import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KeyFeaturesSection from './KeyFeaturesSection'

// data
import { details } from '@/data/details'
import { REVIEWS } from '@/data/_reviews'
import { KEY_FEATURES } from '../../constants/keyFeatures'

const _createdFeatures = () => {
  const formatted = KEY_FEATURES.map((v) => [v, true])
  const obj = Object.fromEntries(formatted)
  return obj
}

const DATA = {
  ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
  reviews: REVIEWS,
  // ..._createdFeatures(),
}

export default {
  title: 'Features/Details/KeyFeaturesSection',
  component: KeyFeaturesSection,
} as ComponentMeta<typeof KeyFeaturesSection>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof KeyFeaturesSection> = (args) => (
  <KeyFeaturesSection {...args} />
)

export const Default = Template.bind({})

Default.args = {
  data: DATA,
}
