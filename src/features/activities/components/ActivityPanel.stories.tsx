// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActivityPanel from './ActivityPanel'

export default {
  title: 'Features/Activities/Panel',
  component: ActivityPanel,
} as ComponentMeta<typeof ActivityPanel>

const Template: ComponentStory<typeof ActivityPanel> = () => <ActivityPanel />

export const Default = Template.bind({})

Default.args = {}
