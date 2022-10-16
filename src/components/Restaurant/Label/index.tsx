// Icons
import Route from './icons/Route'

type Props = {
  distance: number
}

const Label = (props: Props) => {
  const { distance } = props
  return (
    <span className='flex gap-2 items-center bg-gh-gray w-fit px-2 py-1 rounded-md text-white'>
      <Route height={12} width={12} />
      {distance}km
    </span>
  )
}

export default Label
