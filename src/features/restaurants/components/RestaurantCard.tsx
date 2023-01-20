// config
import { colors } from '@/config/colors'

// components
import { Button, Texts, Label } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close, RouteArrow } from '@/components/icons'

// Types
import { RestaurantProps, RestaurantData } from '../types'

const Card = (props: RestaurantProps) => {
  const { isLocked, data } = props
  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white relative'>
      <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={() => {}}>
        <Close fill={colors['gh-white']} />
      </button>
      <img
        src={'getImageURL(props?.data?.photos)'}
        alt={`'s thumbnail`}
        className={`select-none max-h-52 w-full object-cover h-52`}
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label text={'2000M'} extraClassName={''} icon={<RouteArrow />} />
        <Texts main={'data?.name'} sub={"data?.types?.join('・')"} />
        <footer className='flex w-full gap-4'>
          <Button text='ASS' />
          <LikeButton isLiked={Boolean(data?.is_liked)} isLocked={isLocked} />
        </footer>
      </div>
    </div>
  )
}

const Compact = (props: RestaurantProps) => {
  const { isLocked, data } = props
  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={() => {}}
    >
      <img
        src={'getImageURL(data?.photos)'}
        alt={`'s thumbnail`}
        className={`max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md`}
      />
      <div className='flex flex-1 gap-4 items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <Texts main={'data?.name'} sub={"data?.types?.join('・')"} size='small' />
          <Label text='200' />
        </div>
        <LikeButton onClick={() => {}} isLiked={Boolean(data?.is_liked)} isLocked={isLocked} />
      </div>
    </div>
  )
}

const RestaurantCard = (props: RestaurantProps<{ compact?: boolean }>) => {
  const { compact } = props
  if (compact) {
    return <Compact {...props} />
  } else {
    return <Card {...props} />
  }
}

export default RestaurantCard
