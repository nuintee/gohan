// Icons
import { ReactNode } from 'react'
import Route from './icons/Route'

type Props = {
  text?: string
  icon: ReactNode
  extraClassName?: string
}

const Label = (props: Props) => {
  const { text, extraClassName, icon } = props
  return (
    <span
      className={`flex gap-2 items-center bg-gh-gray w-fit px-2 py-1 rounded-md text-white ${extraClassName}`}
    >
      {icon}
      {text}
    </span>
  )
}

export default Label
