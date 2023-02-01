import React, { ComponentProps } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import User from './User'

// Data
import { user } from '@/data/user'

// Wrapper
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

const decorator = (Story, ctx, authed) => {
  console.log(ctx.args.session)
  return (
    <SessionProvider session={authed && ctx.args.session.data}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </SessionProvider>
  )
}

const defaultDecorators = [(Story, ctx) => decorator(Story, ctx, false)]
const authedDecorators = [(Story, ctx) => decorator(Story, ctx, true)]

export default {
  title: 'Features/Users/User',
  component: User,
  decorators: defaultDecorators,
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => {
  return <User {...args} />
}

export const Guest = Template.bind({})
export const Authed = Template.bind({})

Guest.args = {}

Authed.args = {
  session: {
    status: 'authenticated',
    data: {
      expires: '60000',
      user,
    },
  },
}

Authed.decorators = authedDecorators
