import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import User from './User'

// Data
import { user } from '@/data/user'

export default {
  title: 'Features/Users/User',
  component: User,
  args: {
    _isAuthed: false,
  },
  argTypes: {
    _isAuthed: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => {
  return <User {...args} isLoading={args.isLoading} />
}

export const Default = Template.bind({})

Default.args = {}
