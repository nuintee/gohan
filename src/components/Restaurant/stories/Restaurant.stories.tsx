import { initialData } from '@/constants/restaurant'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Restaurant from '../index'

export default {
  title: 'Restaurant',
  component: Restaurant,
} as ComponentMeta<typeof Restaurant>

const LargeTemplate: ComponentStory<typeof Restaurant> = (args) => <Restaurant {...args} />

export const Large = LargeTemplate.bind({})

Large.args = {
  isLiked: true,
  isLocked: true,
  data: initialData,
  distance: '',
} // add initial data for restaurant
