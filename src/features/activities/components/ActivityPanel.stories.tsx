// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActivityPanel from './ActivityPanel'
import { activities } from '@/data/activities'

export default {
  title: 'Features/Activities/Panel',
  component: ActivityPanel,
} as ComponentMeta<typeof ActivityPanel>

const Template: ComponentStory<typeof ActivityPanel> = (args) => <ActivityPanel {...args} />

export const Default = Template.bind({})
export const Loading = Template.bind({})
export const Empty = Template.bind({})

Default.args = {
  query: {
    data: activities,
  },
}

Loading.args = {
  query: {
    isFetching: true,
  },
}

Empty.args = {
  query: {
    data: [],
  },
}
