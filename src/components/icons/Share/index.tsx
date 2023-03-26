import { Props } from '../index.types'

const Share = ({ width = 17, height = 17, fill = 'gray' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18 7.5L11 0.5V4.5C4 5.5 1 10.5 0 15.5C2.5 12 6 10.4 11 10.4V14.5L18 7.5Z'
        fill={fill}
      />
    </svg>
  )
}

export default Share
