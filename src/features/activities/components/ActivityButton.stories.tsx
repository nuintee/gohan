// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AcitvityButton from './ActivityButton'

export default {
  title: 'Features/Activities/Button',
  component: AcitvityButton,
} as ComponentMeta<typeof AcitvityButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AcitvityButton> = (args) => <AcitvityButton {...args} />

export const Default = Template.bind({})

Default.args = {
  isLocked: false,
}
