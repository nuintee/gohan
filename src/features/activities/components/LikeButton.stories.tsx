// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LikeButton from './LikeButton'

export default {
  title: 'Features/Activities/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LikeButton> = (args) => <LikeButton {...args} />

export const Default = Template.bind({})
export const Locked = Template.bind({})
export const Liked = Template.bind({})

Default.args = {}

Locked.args = {
  isLocked: true,
}

Liked.args = {
  isLiked: true,
}
