// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Header from './index'

export default {
  title: 'UI/Header',
  component: Header,
} as ComponentMeta<typeof Header>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})

Default.args = {}
