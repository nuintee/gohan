import { Close } from '@/components/icons'

const MarkerPin = ({
  circleColor = '#F4F4F4',
  icon,
}: {
  circleColor?: string
  icon?: JSX.Element
}) => {
  return (
    <svg width='81' height='93' viewBox='0 0 81 93' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d_1016_3736)'>
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M40.4286 4C20.3096 4 4 20.3096 4 40.4286C4 57.9939 16.4322 72.6556 32.9774 76.0945L40.4284 89L47.8794 76.0945C64.4248 72.6557 76.8571 57.994 76.8571 40.4286C76.8571 20.3096 60.5475 4 40.4286 4Z'
          fill='white'
        />
        <rect
          x='11.5703'
          y='11.5715'
          width='57.7143'
          height='57.7143'
          rx='28.8571'
          fill={circleColor}
          stroke={circleColor}
          stroke-width='3'
        />
        <path d='M30 50.4H50V30.4H30V50.4Z' fill='url(#pattern0)' />
      </g>
      <defs>
        <filter
          id='filter0_d_1016_3736'
          x='0'
          y='0'
          width='80.8574'
          height='93'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1016_3736' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_1016_3736'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}

export default MarkerPin
