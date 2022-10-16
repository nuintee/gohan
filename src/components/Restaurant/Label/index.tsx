type Props = {
  distance: number
}

const Label = (props: Props) => {
  const { distance } = props
  return <span className='bg-gh-gray w-fit px-2 py-1 rounded-md text-white'>{distance}km</span>
}

export default Label
