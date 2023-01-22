import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserSignoutConsentDialog from './UserSignoutConsentDialog'

export default {
  title: 'Features/Users/Modals/UserSignoutConsentDialog',
  component: UserSignoutConsentDialog,
} as ComponentMeta<typeof UserSignoutConsentDialog>

const Template: ComponentStory<typeof UserSignoutConsentDialog> = (args) => {
  return <UserSignoutConsentDialog {...args} />
}

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
}
