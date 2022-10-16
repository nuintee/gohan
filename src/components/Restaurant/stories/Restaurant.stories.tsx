import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Restaurant } from '../index'

export default {
  title: 'Restaurant',
  component: Restaurant.Large,
} as ComponentMeta<typeof Restaurant.Large>

const LargeTemplate: ComponentStory<typeof Restaurant.Large> = (args) => (
  <Restaurant.Large {...args} />
)
const SmallTemplate: ComponentStory<typeof Restaurant.Small> = (args) => (
  <Restaurant.Small {...args} />
)

export const Large = LargeTemplate.bind({})
export const Small = SmallTemplate.bind({})

Large.args = {
  state: 'LIKED',
}

Small.args = {
  state: 'LIKED',
}
