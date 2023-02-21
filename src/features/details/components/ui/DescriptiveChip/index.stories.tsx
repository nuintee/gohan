// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DescriptiveChip from '.'

export default {
  title: 'UI/DescriptiveChip',
  component: DescriptiveChip,
} as ComponentMeta<typeof DescriptiveChip>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DescriptiveChip> = (args) => <DescriptiveChip {...args} />

export const Default = Template.bind({})

Default.parameters = {
  backgrounds: {
    default: '#FFF',
  },
}
