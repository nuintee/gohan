const RightChevron = ({ scale = 1, stroke = 'gray' }: { scale?: number; stroke?: string }) => {
  return (
    <svg
      width={scale * 8}
      height={scale * 14}
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

export default RightChevron
