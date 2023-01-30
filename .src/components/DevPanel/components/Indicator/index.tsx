import { useToast } from '@/hooks/context'
import { Copy } from '@/icons'
import copy from '@/utils/copy'
import { IndicatorProps } from '../../types'

const Indicator = (props: IndicatorProps) => {
  const { label, value, supportText, allowCopy } = props
  const { manageToast } = useToast()

  const copyHandle = (text: string) => {
    copy(
      text,
      (str) => {
        manageToast({
          isOpen: true,
          main: 'Copied!',
          sub: str,
          mode: 'success',
        })
      },
      (error) => {
        manageToast({
          isOpen: true,
          main: 'Copy Failed',
          sub: error.message,
          mode: 'error',
        })
      },
    )
  }

  return (
    <div className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none flex justify-between gap-2'>
      <p className='flex items-center gap-1'>
        {label}: {value}
        <span className='text-xs text-gh-gray'>{supportText && `(${supportText})`}</span>
      </p>
      {allowCopy && (
        <button className='text-gray-400 active:text-gray-300' onClick={() => copyHandle(value)}>
          <Copy />
        </button>
      )}
    </div>
  )
}

export default Indicator
