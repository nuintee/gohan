import { Props } from '../index.types'

const Hamburger = ({ width = 20, height = 20, fill = 'white' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1H23M1 9H23M1 17H23'
        stroke={fill}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default Hamburger
