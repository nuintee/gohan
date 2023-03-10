import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserSettingsModal from './UserProfileModal'

// data
import { user } from '@/data/user'

export default {
  title: 'Features/Users/Modals/UserSettingsModal',
  component: UserSettingsModal,
} as ComponentMeta<typeof UserSettingsModal>

const Template: ComponentStory<typeof UserSettingsModal> = () => {
  return <UserSettingsModal />
}

export const Default = Template.bind({})

Default.args = {
  user,
}
