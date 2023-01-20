// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import GohanButton from './index'

export default {
  title: 'UI/GohanButton',
  component: GohanButton,
} as ComponentMeta<typeof GohanButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof GohanButton> = (args) => <GohanButton {...args} />

export const Default = Template.bind({})

Default.args = {}
