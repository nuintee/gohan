// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AcitvityButton from './ActivityButton'

// Wrapper
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const decorator = (Story, ctx) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Story />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

const defaultDecorators = [decorator]

export default {
  title: 'Features/Activities/Button',
  component: AcitvityButton,
  decorators: defaultDecorators,
} as ComponentMeta<typeof AcitvityButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AcitvityButton> = (args) => <AcitvityButton {...args} />

export const Default = Template.bind({})

Default.args = {
  isLocked: false,
}
