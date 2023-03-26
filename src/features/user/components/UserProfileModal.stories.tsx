import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserProfileModal from './UserProfileModal'

// data
import { user } from '@/data/user'

export default {
  title: 'Features/Users/Modals/UserProfileModal',
  component: UserProfileModal,
} as ComponentMeta<typeof UserProfileModal>

const Template: ComponentStory<typeof UserProfileModal> = () => {
  return <UserProfileModal />
}

export const Default = Template.bind({})

Default.args = {
  user,
}
