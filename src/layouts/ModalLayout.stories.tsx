// Button.stories.ts|tsx

import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

// Layout
import ModalLayout from './ModalLayout'

// Lib
import Modal from 'react-modal'

const childrenMapper: any = {
  UserAuthModal: <p>Auth</p>,
  UserSettingsModal: <p>Settings</p>,
  UserSignoutDialog: <p>SignoutDialog</p>,
  UserSigninConsentDialog: <p>SigninConsentDialog</p>,
  RestaurantDiscoverModal: <p>RestaurantDiscoverModal</p>,
}

type ArgProps = { children: string } & Omit<ComponentProps<typeof Modal>, 'children'>

type ExtendedModalLayout = (args: ArgProps) => JSX.Element

export default {
  title: 'Layouts/Modal',
  component: ModalLayout,
  argTypes: {
    children: {
      options: [
        'UserAuthModal',
        'UserSettingsModal',
        'UserSignoutDialog',
        'UserSigninConsentDialog',
        'RestaurantDiscoverModal',
      ],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: 'UserAuthModal',
  },
} as ComponentMeta<ExtendedModalLayout>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<ExtendedModalLayout> = (args) => {
  const children = childrenMapper[args.children]

  return <ModalLayout {...args} children={children} />
}

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
}

Default.parameters = {
  backgrounds: {
    default: 'white',
  },
}
