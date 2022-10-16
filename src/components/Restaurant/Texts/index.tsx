type Props = {
  main: string
  sub?: string
}

const Texts = (props: Props) => {
  const { main, sub } = props

  return (
    <div>
      <h1 className='text-xl font-bold'>{main || 'MAIN TEXT'}</h1>
      <p className='text-gh-l-gray'>{sub || 'SUB TEXT'}</p>
    </div>
  )
}

export default Texts
