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
}

{
  /* <div className='flex flex-col gap-2'>
                <div className='flex gap-4'>
                  <h1 className='text-3xl font-bold text-white'>{data.name}</h1>
                  {status === 'authenticated' && <ActivityStatus status={data.reviewStatus} />}
                </div>
                <p className='text-white text-md'>
                  {data.editorial_summary?.overview || data.types?.join('・')}
                </p>
              </div> */
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
  } = props

  const textSize = sizes[size || 'normal']

  return (
    <div className='flex w-full items-center justify-between rounded-md gap-2 whitespace-nowrap'>
      <div className='flex flex-col'>
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
            {sub || 'Description'}
          </p>
          {subDecoration}
        </div>
      </div>
    </div>
  )
}

export default Texts
