// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MapBox from './MapBox'

export default {
  title: 'Features/MapBox/MapBox',
  component: MapBox,
} as ComponentMeta<typeof MapBox>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MapBox> = (args) => <MapBox {...args} />

export const Default = Template.bind({})

Default.args = {}
