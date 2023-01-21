// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ModalLayout from './ModalLayout'

export default {
  title: 'Layouts/Modal',
  component: ModalLayout,
} as ComponentMeta<typeof ModalLayout>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ModalLayout> = (args) => <ModalLayout {...args} />

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
}

Default.parameters = {
  backgrounds: {
    default: 'white',
  },
}
