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
}

const Texts = (props: Props) => {
  const { main, sub, size } = props

  const textSize = sizes[size || 'normal']

  return (
    <div>
      <h1 className={`font-bold ${textSize.main}`}>{main || 'MAIN TEXT'}</h1>
      <p className={`text-gh-l-gray ${textSize.sub}`}>{sub || 'SUB TEXT'}</p>
    </div>
  )
}

export default Texts
