// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import BasicInfoModal from './BasicInfoModal'

//data
import { details } from '@/data/details'

export default {
  title: 'Features/Details/Modals/Basic',
  component: BasicInfoModal,
} as ComponentMeta<typeof BasicInfoModal>

const Template: ComponentStory<typeof BasicInfoModal> = (args) => <BasicInfoModal {...args} />

export const Default = Template.bind({})

Default.args = {
  data: {
    ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
    opening_hours: {
      periods: [
        {
          open: {
            time: 'gea',
          },
        },
      ],
    },
  },
}
