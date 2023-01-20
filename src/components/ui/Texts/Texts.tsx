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
}

type Props = {
  main: string
  sub?: string
  size?: 'small' | 'normal'
  icon?: React.ReactNode
}

const Texts = (props: Props) => {
  const { main, sub, size, icon } = props

  const textSize = sizes[size || 'normal']

  return (
    <div className='flex w-full items-center justify-between rounded-md gap-2'>
      <div className='flex flex-col'>
        <h1 className={`font-bold ${textSize.main}`}>{main || 'Name'}</h1>
        <p className={`text-gh-l-gray ${textSize.sub}`}>{sub || 'Description'}</p>
      </div>
      {icon}
    </div>
  )
}

export default Texts
