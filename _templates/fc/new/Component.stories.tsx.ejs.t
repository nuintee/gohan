---
to: <%= path %>/stories/<%= name%>.stories.tsx
---

import { ComponentMeta, ComponentStory } from '@storybook/react'
import Psah from '..'

export default {
  title: `<%= name %>`,
  component: <%= name %>,
} as ComponentMeta<typeof <%= name %> >

const <%= name %>Template: ComponentStory<typeof <%= name %>> = (args) => < <%= name %> {...args} />

export const Default = <%= name %>Template.bind({})

Default.args = {
  type: 'text',
}
