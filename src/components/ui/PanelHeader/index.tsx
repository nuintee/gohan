import { MouseEventHandler } from 'react'

// Config
import { colors } from '@/config/colors'

// Icon
import { Close } from '@/components/icons'

type Props = {
  title?: string
  background?: string
  onClose?: MouseEventHandler<HTMLButtonElement>
}

const PanelHeader = (props: Props) => {
  const { title, onClose, background } = props

  return (
    <header
      className='p-4 flex gap-2 items-center justify-between border-gh-l-gray'
      style={{ background: background || '#FFF' }}
    >
      <p className='font-bold select-none'>{title || 'TITLE'}</p>
      <button onClick={onClose}>
        <Close fill={colors['gh-gray']} />
      </button>
    </header>
  )
}

export default PanelHeader
