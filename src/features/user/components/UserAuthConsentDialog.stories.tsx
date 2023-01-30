import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserAuthConsentDialog from './UserAuthConsentDialog'

export default {
  title: 'Features/Users/Modals/UserAuthConsentDialog',
  component: UserAuthConsentDialog,
} as ComponentMeta<typeof UserAuthConsentDialog>

const Template: ComponentStory<typeof UserAuthConsentDialog> = (args) => {
  return <UserAuthConsentDialog {...args} />
}

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
}
