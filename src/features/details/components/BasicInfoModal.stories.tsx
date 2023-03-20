// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import BasicInfoModal from './BasicInfoModal'

//data
import { details } from '@/data/details'
import { PERIODS } from '@/data/_openingHours'
import { ResultsEntity } from '@/features/restaurants/types'

const onlyOpenProp = PERIODS.map((v) => ({ open: v.open }))

export default {
  title: 'Features/Details/Modals/Basic',
  component: BasicInfoModal,
} as ComponentMeta<typeof BasicInfoModal>

const Template: ComponentStory<typeof BasicInfoModal> = (args) => <BasicInfoModal {...args} />

export const Default = Template.bind({})
export const NoCloseHours = Template.bind({})
export const ExtraHoursPerDay = Template.bind({})

Default.args = {
  data: {
    ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
    current_opening_hours: {
      periods: PERIODS,
    },
    website: 'https://localhost:3000',
    international_phone_number: '+00 00-0000-0000',
  } as ResultsEntity,
}

NoCloseHours.args = {
  data: {
    ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
    current_opening_hours: {
      periods: onlyOpenProp,
    },
    website: 'https://localhost:3000',
    international_phone_number: '+00 00-0000-0000',
  } as ResultsEntity,
}

ExtraHoursPerDay.args = {
  data: {
    ...details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
    current_opening_hours: {
      periods: [
        ...PERIODS,
        {
          open: {
            day: 0,
            time: '0900',
            date: '2023-02-05',
            truncated: true,
          },
          close: {
            day: 0,
            time: '1000',
            date: '2023-02-05',
            truncated: true,
          },
        },
      ],
    },
    website: 'https://localhost:3000',
    international_phone_number: '+00 00-0000-0000',
  } as ResultsEntity,
}
