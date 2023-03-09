import { colors } from '@/config/colors'
import { Props } from '../index.types'

const Sort = ({ width = 10, height = 16, fill = colors['gh-l-gray'] }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 10 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4.59 2.83L7.76 6L9.17 4.59L4.59 0L0 4.59L1.42 6L4.59 2.83Z' fill={fill} />
      <path
        d='M1.41977 10L4.58977 13.17L7.75977 10L9.17977 11.41L4.58977 16L0.00976562 11.41L1.41977 10Z'
        fill={fill}
      />
    </svg>
  )
}

export default Sort
