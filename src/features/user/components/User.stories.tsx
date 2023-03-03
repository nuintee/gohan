import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import User from './User'

// Data
import { user } from '@/data/user'

export default {
  title: 'Features/Users/User',
  component: User,
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => {
  return <User {...args} />
}

export const Guest = Template.bind({})
export const Authed = Template.bind({})

Guest.args = {}

Authed.args = {
  session: {
    status: 'authenticated',
    data: {
      user,
      expires: '',
    },
  },
}
