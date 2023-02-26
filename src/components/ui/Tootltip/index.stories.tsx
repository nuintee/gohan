import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tooltip from './index'

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
