// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Brand from './index'

export default {
  title: 'UI/Brand',
  component: Brand,
} as ComponentMeta<typeof Brand>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Brand> = () => <Brand />

export const Default = Template.bind({})

Default.args = {}
