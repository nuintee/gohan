import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import User from './User'

export default {
  title: 'Features/Users/User',
  component: User,
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => {
  return <User {...args} />
}

export const Default = Template.bind({})

Default.args = {}
