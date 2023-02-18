import { colors } from '@/config/colors'

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
  main: string
  sub?: string | JSX.Element
  size?: 'small' | 'normal' | 'large'
  mainColor?: string
  subColor?: string
  mainDecoration?: JSX.Element | string
  subDecoration?: JSX.Element | string
  gap?: boolean
  isLoading?: boolean
}

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
  } = props

  const textSize = sizes[size || 'normal']

  if (isLoading)
    return (
      <div className='flex flex-col gap-2 animate-pulse'>
        <div className='bg-gh-l-gray p-1 w-52 h-8 rounded-md'></div>
        <div className='bg-gh-l-gray p-1 h-8 rounded-md'></div>
      </div>
    )

  return (
    <div className='flex w-full items-center justify-between rounded-md gap-2 whitespace-nowrap'>
      <div className={`flex flex-col ${gap && 'gap-2'}`}>
        <div className='flex gap-4'>
          <h1
            className={`font-bold ${textSize.main}`}
            style={{
              color: mainColor,
            }}
          >
            {main || 'Name'}
          </h1>
          {mainDecoration}
        </div>
        <div className='flex gap-4'>
          <p
            className={`${textSize.sub}`}
            style={{
              color: subColor,
            }}
          >
            {sub}
          </p>
          {subDecoration}
        </div>
      </div>
    </div>
  )
}

export default Texts
