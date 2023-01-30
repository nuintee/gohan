import { ComponentMeta, ComponentStory } from '@storybook/react'
import Toast from '..'

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />

export const Default = Template.bind({})

Default.args = {
  mode: 'success',
  main: '',
  sub: '',
  onClose: () => {},
  infinite: false,
  timeout: 6000, // Millisecond
}
