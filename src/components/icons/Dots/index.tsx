import { Props } from '../index.types'

const Dots = ({
  size = 20,
  fill = 'gray',
  direction = 'horizontal',
}: Pick<Props, 'fill'> & { size?: number; direction?: 'vertical' | 'horizontal' }) => {
  return (
    <svg
      width={size}
      height={size / 5}
      style={{
        transform: direction === 'vertical' ? `rotate(90deg)` : '',
      }}
      viewBox='0 0 20 4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.793 3.6575C18.716 3.6575 19.457 2.9165 19.457 2.0065C19.457 1.0835 18.716 0.342501 17.793 0.342501C16.883 0.342501 16.142 1.0835 16.142 2.0065C16.142 2.9165 16.883 3.6575 17.793 3.6575Z'
        fill={fill}
      />
      <path
        d='M9.99303 3.6575C10.916 3.6575 11.657 2.9165 11.657 2.0065C11.657 1.0835 10.916 0.342501 9.99303 0.342502C9.08303 0.342502 8.34203 1.0835 8.34203 2.0065C8.34203 2.9165 9.08303 3.6575 9.99303 3.6575Z'
        fill={fill}
      />
      <path
        d='M2.19303 3.6575C3.11603 3.6575 3.85703 2.9165 3.85703 2.0065C3.85703 1.0835 3.11603 0.342502 2.19303 0.342502C1.28303 0.342502 0.54203 1.0835 0.54203 2.0065C0.54203 2.9165 1.28303 3.6575 2.19303 3.6575Z'
        fill={fill}
      />
    </svg>
  )
}

export default Dots
