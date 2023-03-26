import { colors } from '@/config/colors'
import { Props } from '../index.types'

const Filter = ({ width = 17, height = 17, fill = colors['gh-l-gray'] }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.02076 16C6.73743 16 6.49976 15.904 6.30776 15.712C6.11576 15.52 6.02009 15.2827 6.02076 15V9L0.220761 1.6C-0.0292387 1.26667 -0.0669053 0.916667 0.107761 0.55C0.282428 0.183334 0.586762 0 1.02076 0H15.0208C15.4541 0 15.7584 0.183334 15.9338 0.55C16.1091 0.916667 16.0714 1.26667 15.8208 1.6L10.0208 9V15C10.0208 15.2833 9.92476 15.521 9.73276 15.713C9.54076 15.905 9.30343 16.0007 9.02076 16H7.02076Z'
        fill={fill}
      />
    </svg>
  )
}

export default Filter
