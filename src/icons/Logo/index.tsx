import { Props } from '../index.types'

const Logo = (props: Props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 114 114'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <ellipse cx='43.2413' cy='57' rx='43.2414' ry='41.8001' fill='white' />
      <ellipse cx='70.7586' cy='41.7999' rx='43.2414' ry='41.8001' fill='white' />
      <ellipse cx='72.7242' cy='81.7' rx='33.4138' ry='32.3' fill='white' />
      <ellipse cx='60.931' cy='55.1001' rx='25.5518' ry='24.7' fill='#FF9C06' />
    </svg>
  )
}

export default Logo
