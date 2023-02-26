import { Copy } from '@/components/icons'
import { colors } from '@/config/colors'
import { copy } from '@/utils/copy'

const CopyButton = ({
  copyValue = '',
  copyColor = colors['gh-l-gray'],
}: {
  copyValue?: string
  copyColor?: string
}) => {
  const handleClick = (e) => {
    e.stopPropagation()
    copy(copyValue)
  }

  return (
    <button onClick={handleClick} className='active:opacity-50'>
      <Copy fill={copyColor} size={20} />
    </button>
  )
}

export default CopyButton
