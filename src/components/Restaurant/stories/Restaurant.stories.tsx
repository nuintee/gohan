import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Restaurant } from '../index'

export default {
  title: 'Restaurant',
  component: Restaurant,
} as ComponentMeta<typeof Restaurant>

const Template: ComponentStory<typeof Restaurant> = (args) => <Restaurant {...args} />

export const Default = Template.bind({})

Default.args = {
  state: 'LIKED',
}
