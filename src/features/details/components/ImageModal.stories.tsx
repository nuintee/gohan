// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ImageModal from './ImageModal'

export default {
  title: 'Features/Details/Modals/Image',
  component: ImageModal,
} as ComponentMeta<typeof ImageModal>

const Template: ComponentStory<typeof ImageModal> = (args) => <ImageModal {...args} />

export const Default = Template.bind({})

Default.args = {}
