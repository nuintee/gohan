const Chevron = ({
  scale = 1,
  stroke = 'gray',
  direction = 'right',
}: {
  scale?: number
  stroke?: string
  direction?: 'top' | 'bottom' | 'right' | 'left'
}) => {
  const rotate = () => {
    switch (direction) {
      case 'top':
        return 'rotateZ(-90deg)'
      case 'bottom':
        return 'rotateZ(90deg)'
      case 'left':
        return 'rotateZ(-180deg)'
      default:
        return 'rotateZ(0deg)'
    }
  }

  return (
    <svg
      width={scale * 8}
      height={scale * 14}
      style={{
        transform: rotate(),
      }}
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 13L7 7L0.999999 1'
        stroke={stroke}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default Chevron
