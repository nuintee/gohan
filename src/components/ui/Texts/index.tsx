import { colors } from '@/config/colors'
import CopyButton from '../CopyButton'

// constants
const sizes = {
  small: {
    main: 'text-base',
    sub: 'text-sm',
  },
  normal: {
    main: 'text-xl',
    sub: 'text-base',
  },
  large: {
    main: 'text-3xl',
    sub: 'text-md',
  },
}

type Props = {
  main?: string
  sub?: string | JSX.Element
  size?: 'small' | 'normal' | 'large'
  mainColor?: string
  subColor?: string
  mainDecoration?: JSX.Element | string
  subDecoration?: JSX.Element | string
  gap?: boolean
  isLoading?: boolean
  textAlign?: 'center' | 'left' | 'right'
  allowCopy?: boolean
  subJustify?: 'justify-center' | 'justify-between' | 'justify-around'
} & React.ComponentProps<typeof CopyButton>

const Texts = (props: Props) => {
  const {
    main,
    sub,
    size,
    mainColor = '#000',
    subColor = colors['gh-l-gray'],
    mainDecoration,
    subDecoration,
    gap = false,
    isLoading = false,
    textAlign = 'left',
    allowCopy = false,
    copyValue,
    copyColor,
    subJustify = 'justify-between',
  } = props

  const textSize = sizes[size || 'normal']

  if (isLoading)
    return (
      <div className='flex flex-col gap-2 animate-pulse'>
        <div className='bg-gh-l-gray p-1 w-52 h-6 sm:h-8 rounded-md'></div>
        <div className='bg-gh-l-gray p-1 h-6 sm:h-8 rounded-md'></div>
      </div>
    )

  return (
    <div className='flex w-full items-center justify-between rounded-md gap-2 whitespace-nowrap'>
      <div className={`flex flex-col w-full ${gap && 'gap-2'}`}>
        <div className='flex gap-4 w-full items-center'>
          <h1
            className={`font-bold truncate ${textSize.main}`}
            style={{
              color: mainColor,
              textAlign,
              ...(textAlign === 'center' && { width: '100%' }),
            }}
          >
            {main || ''}
          </h1>

          {mainDecoration}
          {allowCopy && <CopyButton copyColor={copyColor} copyValue={copyValue} />}
        </div>
        <div className={`flex gap-4 ${subJustify}`}>
          <p
            className={`${textSize.sub} truncate whitespace-nowrap`}
            style={{
              color: subColor,
              textAlign,
              ...(textAlign === 'center' && { width: '100%' }),
            }}
          >
            {sub || ''}
          </p>
          {subDecoration}
        </div>
      </div>
    </div>
  )
}

export default Texts
