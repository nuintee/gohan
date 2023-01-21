// Button.stories.ts|tsx

import React from 'react'

// icons
import { RouteArrow } from '@/components/icons'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Label from './index'

export default {
  title: 'UI/Label',
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Default = Template.bind({})
export const Distance = Template.bind({})

Default.args = {}

Distance.args = {
  icon: <RouteArrow />,
  text: '200m',
}
