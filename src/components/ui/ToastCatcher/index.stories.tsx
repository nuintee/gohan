import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ComponentProps } from 'react'

import { toast } from 'react-toastify'
import ToastCatcher from './index'

type ExtendedToast = (
  args: ComponentProps<typeof ToastCatcher> & {
    _activate: boolean
    _innerText: string
    _types: string
  },
) => JSX.Element

export default {
  title: 'UI/ToastCatcher',
  component: ToastCatcher,
  argTypes: {
    _types: {
      options: ['default', 'success', 'info', 'error'],
      control: {
        type: 'select',
      },
    },
    position: {
      options: [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    position: 'top-center',
    _activate: false,
    _innerText: '',
    _types: 'default',
  },
} as ComponentMeta<ExtendedToast>

const Template: ComponentStory<ExtendedToast> = (args) => {
  const _isActivated = args._activate
  const _innerText = args._innerText
  const _types = args._types

  if (_isActivated) {
    switch (_types) {
      case 'success':
        toast.success(_innerText)
        break
      case 'info':
        toast.info(_innerText)
        break
      case 'error':
        toast.error(_innerText)
        break
      default:
        toast(_innerText)
        break
    }
  }

  return <ToastCatcher {...args} />
}

export const Default = Template.bind({})

Default.args = {}
