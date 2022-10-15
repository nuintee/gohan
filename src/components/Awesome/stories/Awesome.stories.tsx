import { ComponentMeta, ComponentStory } from '@storybook/react'
import Awesome from '..'

export default {
  title: 'Awesome',
  component: Awesome,
} as ComponentMeta<typeof Awesome>

const Template: ComponentStory<typeof Awesome> = (args) => <Awesome {...args} />

export const Default = Template.bind({})

Default.args = {
  text: 'IT',
  int: 100,
}
