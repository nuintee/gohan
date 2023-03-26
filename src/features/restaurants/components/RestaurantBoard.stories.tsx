// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RestaurantBoard from './RestaurantBoard'

export default {
  title: 'Features/Restaurants/RestaurantBoard',
  component: RestaurantBoard,
} as ComponentMeta<typeof RestaurantBoard>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RestaurantBoard> = (args) => <RestaurantBoard {...args} />

export const Default = Template.bind({})
