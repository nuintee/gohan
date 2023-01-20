// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActivityPanel from './ActivityPanel'

export default {
  title: 'Features/Activities/Panel',
  component: ActivityPanel,
} as ComponentMeta<typeof ActivityPanel>

//👇 We create a “template” of how args map to rendering
const TemplatePanel: ComponentStory<typeof ActivityPanel> = (args) => <ActivityPanel {...args} />

export const Panel = TemplatePanel.bind({})

Panel.args = {}
