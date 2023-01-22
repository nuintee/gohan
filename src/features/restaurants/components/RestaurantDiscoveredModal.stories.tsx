// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RestaurantDiscoveredModal from './RestaurantDiscoveredModal'

export default {
  title: 'Features/Restaurants/Modals/RestaurantDiscoveredModal',
  component: RestaurantDiscoveredModal,
} as ComponentMeta<typeof RestaurantDiscoveredModal>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RestaurantDiscoveredModal> = (args) => (
  <RestaurantDiscoveredModal {...args} />
)

export const Default = Template.bind({})

Default.args = {}
