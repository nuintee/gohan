// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DropDown from './index'

// data
const MENU_ITEM_COUNT = 3

const MENU = Array(MENU_ITEM_COUNT)
  .fill(null)
  .map((_, i) => ({
    label: 'Item' + i,
    onDropDownItemClick: () => {},
    ignored: false,
  }))

export default {
  title: 'UI/DropDown',
  component: DropDown,
} as ComponentMeta<typeof DropDown>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />

export const Default = Template.bind({})

Default.args = {
  menu: MENU,
}
