import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserAuthConsentDialog from './UserAuthConsentDialog'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

const decorator = (Story, ctx) => {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </SessionProvider>
  )
}

const defaultDecorators = [(Story, ctx) => decorator(Story, ctx, false)]

export default {
  title: 'Features/Users/Modals/UserAuthConsentDialog',
  component: UserAuthConsentDialog,
  decorators: defaultDecorators,
} as ComponentMeta<typeof UserAuthConsentDialog>

const Template: ComponentStory<typeof UserAuthConsentDialog> = (args) => {
  return <UserAuthConsentDialog {...args} />
}

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
}
