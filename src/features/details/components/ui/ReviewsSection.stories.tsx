// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewsSection from './ReviewsSection'

export default {
  title: 'Features/Details/ReviewSection',
  component: ReviewsSection,
} as ComponentMeta<typeof ReviewsSection>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ReviewsSection> = (args) => <ReviewsSection {...args} />

export const Default = Template.bind({})

Default.parameters = {}
