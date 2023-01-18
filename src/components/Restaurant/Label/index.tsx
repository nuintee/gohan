// Icons
import Route from './icons/Route'

type Props = {
  distance: string | null
  extraClassName?: string
}

const Label = (props: Props) => {
  const { distance, extraClassName } = props
  return (
    <span
      className={`flex gap-2 items-center bg-gh-gray w-fit px-2 py-1 rounded-md text-white ${extraClassName}`}
    >
      <Route height={12} width={12} />
      {distance || 'N/A m'}
    </span>
  )
}

export default Label
