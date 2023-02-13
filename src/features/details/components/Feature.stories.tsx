// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Feature from './Feature'

export default {
  title: 'Features/Details/Feature',
  component: Feature,
} as ComponentMeta<typeof Feature>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Feature> = (args) => <Feature {...args} />

export const Default = Template.bind({})

Default.parameters = {
  backgrounds: {
    default: '#FFF',
  },
}
