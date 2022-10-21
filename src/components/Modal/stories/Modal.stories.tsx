import { ComponentMeta, ComponentStory } from '@storybook/react'
import Modal from '..'

export default {
  title: 'Modal',
  component: Modal.Confirm,
} as ComponentMeta<typeof Modal.Confirm>

const ConfirmTemplate: ComponentStory<typeof Modal.Confirm> = (args) => <Modal.Confirm {...args} />
const DetailsTemplate: ComponentStory<typeof Modal.Details> = (args) => <Modal.Details {...args} />
const UserTemplate: ComponentStory<typeof Modal.User> = (args) => <Modal.User {...args} />

export const Confirm = ConfirmTemplate.bind({})
export const Details = DetailsTemplate.bind({})
export const User = UserTemplate.bind({})

Confirm.args = {
  type: 'like',
  isOpen: true,
  onClose: () => {
    console.log(1)
  },
}

Details.args = {
  state: 'LIKED',
  isOpen: true,
  onClose: () => {
    console.log(1)
  },
}

User.args = {
  isOpen: true,
  onClose: () => {
    console.log(1)
  },
}
