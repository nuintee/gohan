// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AcitvityButton from './ActivityButton'

export default {
  title: 'Features/Activities/Button',
  component: AcitvityButton,
} as ComponentMeta<typeof AcitvityButton>

//👇 We create a “template” of how args map to rendering
const TemplateButton: ComponentStory<typeof AcitvityButton> = (args) => <AcitvityButton {...args} />

export const Button = TemplateButton.bind({})

Button.args = {
  isLocked: false,
}
