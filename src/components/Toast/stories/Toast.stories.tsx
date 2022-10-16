import { ComponentMeta, ComponentStory } from '@storybook/react'
import Toast from '..'

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />

export const Default = Template.bind({})

Default.args = {
  type: 'hero',
  mode: 'close',
  loading: false,
  onClick: () => {
    console.log(1)
  },
}
