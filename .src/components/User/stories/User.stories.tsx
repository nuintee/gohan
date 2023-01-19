import { ComponentMeta, ComponentStory } from '@storybook/react'

import User from '..'

export default {
  title: 'User',
  component: User,
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => <User {...args} />

export const Default = Template.bind({})

Default.args = {
  user: {},
  loading: false,
  onClick: () => {
    console.log(1)
  },
}
