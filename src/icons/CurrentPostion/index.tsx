import { Props } from '../index.types'

const CurrentPostion = (props: Props) => {
  const { fill, ...rest } = props

  return (
    <svg
      width='21'
      height='23'
      viewBox='0 0 21 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M19.5564 10.6407C20.2077 11.0284 20.2077 11.9716 19.5564 12.3593L2.27809 22.644C1.48573 23.1156 0.531554 22.3547 0.815036 21.4773L3.93914 11.8074C4.00371 11.6076 4.00371 11.3924 3.93914 11.1926L0.815037 1.52273C0.531555 0.645285 1.48574 -0.115635 2.27809 0.356005L19.5564 10.6407Z'
        fill={fill || '#232020'}
      />
    </svg>
  )
}

export default CurrentPostion
