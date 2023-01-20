// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RestaurantCard from './RestaurantCard'

export default {
  title: 'Features/Restaurants/RestaurantCard',
  component: RestaurantCard,
} as ComponentMeta<typeof RestaurantCard>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RestaurantCard> = (args) => <RestaurantCard {...args} />

export const Default = Template.bind({})

Default.args = {}
