import { ComponentMeta, ComponentStory } from '@storybook/react'
import Sidebar from '../index'

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Default = Template.bind({})

Default.args = {
  isOpen: true,
  title: 'Activity',
  onClose: () => {
    console.log(1)
  },
}
