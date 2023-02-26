import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tooltip from './index'

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className='relative flex justify-end py-[7.5rem]'>
    <Tooltip {...args} />
  </div>
)

export const Default = Template.bind({})
