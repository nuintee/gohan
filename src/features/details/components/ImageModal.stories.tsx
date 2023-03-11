// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ImageModal from './ImageModal'

export default {
  title: 'Features/Details/Modals/Image',
  component: ImageModal,
} as ComponentMeta<typeof ImageModal>

const Template: ComponentStory<typeof ImageModal> = (args) => <ImageModal {...args} />

export const Portrait = Template.bind({})
export const Landscape = Template.bind({})

Landscape.args = {
  isOpen: true,
  data: {
    url: 'https://via.placeholder.com/1600x900',
    width: 1600,
    height: 90,
    html_attributions: [],
    photo_reference: '',
  },
}
Portrait.args = {
  isOpen: true,
  data: {
    url: 'https://via.placeholder.com/900x1600',
    width: 900,
    height: 1600,
    html_attributions: [],
    photo_reference: '',
  },
}
