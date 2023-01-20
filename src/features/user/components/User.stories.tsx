// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import User from './User'

export default {
  title: 'Features/Users/User',
  component: User,
} as ComponentMeta<typeof User>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof User> = (args) => <User {...args} />

export const Default = Template.bind({})

Default.args = {}
