import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserAuthModal from './UserAuthModal'

export default {
  title: 'Features/Users/Modals/UserAuthModal',
  component: UserAuthModal,
} as ComponentMeta<typeof UserAuthModal>

const Template: ComponentStory<typeof UserAuthModal> = (args) => {
  return <UserAuthModal {...args} />
}

export const Default = Template.bind({})

Default.args = {
  tab: 'signup',
}
