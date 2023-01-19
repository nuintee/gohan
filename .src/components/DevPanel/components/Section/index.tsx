import { useToast } from '@/hooks/context'
import { Copy } from '@/icons'
import copy from '@/utils/copy'
import { SectionProps } from '../../types'

const Section = (props: SectionProps) => {
  const { label, value, supportText, allowCopy, allowReset, disabledReset, onReset, children } =
    props
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
    <section className='flex flex-col gap-2 justify-between'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <p className='flex items-center gap-1 text-gh-gray'>
            {label}
            <span className='text-xs text-gh-gray'>{supportText && `(${supportText})`}</span>
          </p>
          {allowCopy && (
            <button
              className='text-gray-400 active:text-gray-300'
              onClick={() => copyHandle(value)}
            >
              <Copy />
            </button>
          )}
        </div>
        {allowReset && (
          <button
            className={`text text-gh-gray  ${
              !disabledReset && 'active:text-opacity-50 text-blue-500'
            }`}
            onClick={onReset}
            disabled={disabledReset}
          >
            reset
          </button>
        )}
      </div>

      <div className='flex flex-col gap-2 justify-between'>{children}</div>
    </section>
  )
}

export default Section
