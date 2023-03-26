import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Texts from './index'

export default {
  title: 'UI/Texts',
  component: Texts,
  argTypes: {
    size: {
      options: ['small', 'normal'],
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Texts>

const Template: ComponentStory<typeof Texts> = (args) => <Texts {...args} />

export const Default = Template.bind({})

Default.args = {}
Default.parameters = {
  backgrounds: {
    default: '#FFF',
  },
}
