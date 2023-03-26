// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActivityStatus from './ActivityStatus'

export default {
  title: 'Features/Activities/Status',
  component: ActivityStatus,
} as ComponentMeta<typeof ActivityStatus>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ActivityStatus> = (args) => <ActivityStatus {...args} />

export const Default = Template.bind({})

Default.args = {}
