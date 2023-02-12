// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PanelHeader from './index'

export default {
  title: 'UI/PanelHeader',
  component: PanelHeader,
} as ComponentMeta<typeof PanelHeader>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PanelHeader> = (args) => <PanelHeader {...args} />

export const Default = Template.bind({})

Default.args = {}
