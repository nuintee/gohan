import { ComponentMeta, ComponentStory } from '@storybook/react'
import Input from '..'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

const InputTemplate: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = InputTemplate.bind({})

Default.args = {
  type: 'text',
}
