// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LocateUserButton from './LocateUserButton'

export default {
  title: 'Features/MapBox/LocateUserButton',
  component: LocateUserButton,
} as ComponentMeta<typeof LocateUserButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LocateUserButton> = (args) => <LocateUserButton {...args} />

export const Default = Template.bind({})

Default.args = {
  disabled: true,
}
