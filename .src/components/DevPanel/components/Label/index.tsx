import { LabelProps } from '../../types'

const Label = (props: LabelProps) => {
  const { text, spacing, children } = props
  return (
    <div className={`flex gap-2 items-center ${spacing}`}>
      <p>{text}</p>
      {children}
    </div>
  )
}

export default Label
