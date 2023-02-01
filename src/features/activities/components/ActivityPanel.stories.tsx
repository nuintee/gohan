// Button.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActivityPanel from './ActivityPanel'
import { queryClient } from '@/libs/tanstack-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

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
  title: 'Features/Activities/Panel',
  component: ActivityPanel,
  decorators: defaultDecorators,
} as ComponentMeta<typeof ActivityPanel>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ActivityPanel> = (args) => <ActivityPanel {...args} />

export const Default = Template.bind({})

Default.args = {}
