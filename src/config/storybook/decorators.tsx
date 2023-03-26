import { Story } from '@storybook/react'
import { wrapper } from '../jest/wrapper'

export const decorators = [(Story: Story) => wrapper({ children: <Story />, isAuthed: true })]
