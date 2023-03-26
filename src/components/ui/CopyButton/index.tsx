import { Copy } from '@/components/icons'
import { colors } from '@/config/colors'
import { copy } from '@/utils/copy'
import { MouseEventHandler } from 'react'

const CopyButton = ({
  copyValue = '',
  copyColor = colors['gh-l-gray'],
}: {
  copyValue?: string
  copyColor?: string
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    copy(copyValue)
  }

  return (
    <button onClick={handleClick} className='active:opacity-50' data-testid='copy__button'>
      <Copy fill={copyColor} size={20} />
    </button>
  )
}

export default CopyButton
