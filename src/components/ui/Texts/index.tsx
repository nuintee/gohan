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
  sub?: string | JSX.Element
  size?: 'small' | 'normal'
}

const Texts = (props: Props) => {
  const { main, sub, size } = props

  const textSize = sizes[size || 'normal']

  return (
    <div className='flex w-full items-center justify-between rounded-md gap-2 whitespace-nowrap'>
      <div className='flex flex-col'>
        <h1 className={`font-bold ${textSize.main}`}>{main || 'Name'}</h1>
        <p className={`text-gh-l-gray ${textSize.sub}`}>{sub || 'Description'}</p>
      </div>
    </div>
  )
}

export default Texts
