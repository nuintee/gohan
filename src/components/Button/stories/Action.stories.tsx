import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Action } from '../index'

export default {
  title: 'Action',
  component: Action,
} as ComponentMeta<typeof Action>

const Template: ComponentStory<typeof Action> = (args) => <Action {...args} />

export const Default = Template.bind({})

Default.args = {
  type: 'hero',
  mode: 'close',
  loading: false,
  onClick: () => {
    console.log(1)
  },
}
