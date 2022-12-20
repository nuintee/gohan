// Icons
import Route from './icons/Route'

type Props = {
  distance: number // km
  extraClassName: string
}

const distanceFormatter = (distance: number) => {
  if (distance >= 1) {
    return distance + 'km'
  } else if (distance < 1) {
    return Math.round(distance * 1000) + 'm'
  }
}

const Label = (props: Props) => {
  const { distance, extraClassName } = props
  return (
    <span
      className={`flex gap-2 items-center bg-gh-gray w-fit px-2 py-1 rounded-md text-white ${extraClassName}`}
    >
      <Route height={12} width={12} />
      {distanceFormatter(distance)}
    </span>
  )
}

export default Label
