// Icons
import Close from '../../icons/Close'
import Check from '../../icons/Check'

// Components
import Texts from '../Restaurant/Texts'

// Constans
import { colors } from '@/../config/tailwind/index'
import { useEffect } from 'react'

// Types
import { Props } from './index.types'

const themes = {
  error: {
    text: 'Error',
    border: 'border-gh-red',
    badge: {
      bg: 'bg-gh-l-red',
      icon: <Close fill='' />,
    },
  },
  success: {
    text: 'Success',
    border: 'border-gh-green',
    badge: {
      bg: 'bg-gh-l-green',
      icon: <Check fill='' />,
    },
  },
}

const Toast = (props: Props) => {
  const { isOpen, mode, main, sub, onClose, infinite, timeout } = props

  useEffect(() => {
    if (infinite || !isOpen) return

    const init = () => {
      setTimeout(() => {
        onClose()
      }, timeout || 2000)
    }

    init()
  }, [isOpen])

  return (
    <div
      className={`absolute z-[2] top-[2rem] left-1/2 -translate-x-1/2 bg-white p-4 rounded-md border-l-8 ${
        themes[mode].border
      } flex gap-4 duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-0'}`}
    >
      <span
        className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-full ${themes[mode].badge.bg}`}
      >
        {themes[mode].badge.icon}
      </span>
      <Texts main={main || themes[mode].text} sub={sub || 'SUB'} size='small' />
      {!infinite && (
        <button className='ml-auto' onClick={onClose}>
          <Close fill={colors['gh-dark']} />
        </button>
      )}
    </div>
  )
}

export default Toast
