import { ComponentMeta, ComponentStory } from '@storybook/react'
import Modal from '..'

export default {
  title: 'Modal',
  component: Modal.Confirm,
} as ComponentMeta<typeof Modal.Confirm>

const Template: ComponentStory<typeof Modal.Confirm> = (args) => <Modal.Confirm {...args} />

export const Confirm = Template.bind({})

Confirm.args = {
  type: 'like',
  isOpen: true,
  onClose: () => {
    console.log(1)
  },
}
