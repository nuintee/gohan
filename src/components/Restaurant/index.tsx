import { Coords } from '@/constants/coords'
import useRestaurantSearch from '@/hooks/API/restaurant'
import { useMapBox, useModals } from '@/hooks/context'
import useGPS from '@/hooks/context/GPS'
import useRestaurants from '@/hooks/context/Restaurants'
import { ResultsEntity } from '@/hooks/context/Restaurants/types'
import { Close } from '@/icons'
import { RestaurantProps } from '@/types/Restaurant'
import { colors } from 'config/tailwind'
import Image from 'next/image'
import { useEffect } from 'react'
import { Regular } from '../Button'
import Label from './Label'
import { Like } from './Like'
import Texts from './Texts'

type CommonProps = {
  onLike: Function
} & RestaurantProps

type SmallProps = {
  onClick: Function
} & CommonProps

type CardProps = {
  isNavigating: boolean
  isLoading: boolean
  onClick: Boolean
  onClose: Function
} & CommonProps

const getImageURL = (photos: ResultsEntity['photos']) => {
  const fallbackURL = `https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80`
  if (!!photos?.length && !!photos[0].photo_reference) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
    return url
  } else {
    return fallbackURL
  }
}

const _Small = (props: SmallProps) => {
  const { data, isLiked, isLocked, distance, onLike, onClick } = props

  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={onClick}
    >
      <img
        src={getImageURL(data?.photos)}
        alt={`${data?.name}'s thumbnail`}
        className={`max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md`}
      />
      <div className='flex flex-1 gap-4 items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <Texts main={data?.name} sub={data?.types?.join('・')} size='small' />
          <Label distance={distance} />
        </div>
        <Like onClick={onLike} isLiked={isLiked} isLocked={isLocked} />
      </div>
    </div>
  )
}

const _Card = (props: CardProps) => {
  const { data, isLiked, isLocked, distance, onLike, isNavigating, isLoading, onClick, onClose } =
    props

  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white relative'>
      <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={onClose}>
        <Close fill={colors['gh-white']} />
      </button>
      <img
        src={getImageURL(props?.data?.photos)}
        alt={`${data?.name}'s thumbnail`}
        className={`select-none max-h-52 w-full object-cover h-52`}
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label distance={distance} extraClassName={''} />
        <Texts main={data?.name} sub={data?.types?.join('・')} />
        {data?.website && (
          <p className='bg-gh-l-orange text-center p-4 rounded-md'>
            Checkout more data from{' '}
            <a href={data?.website} className='text-gh-orange font-semibold'>
              Here
            </a>
          </p>
        )}
        <footer className='flex w-full gap-4'>
          {/* Footer */}
          <Regular
            text={isNavigating ? 'Stop Navigation' : 'Navigate'}
            loading={isLoading}
            onClick={onClick}
            icon={{
              position: 'before',
              src: isNavigating && <Close fill='#FFF' />,
            }}
          />
          <Like onClick={onLike} isLiked={isLiked} isLocked={isLocked} />
        </footer>
      </div>
    </div>
  )
}

const Restaurant = (props: RestaurantProps) => {
  const { mode, data, isLocked, isLiked } = props
  const { calculateDistance, currentPosition } = useGPS()
  const { formatObjectCoords } = useRestaurantSearch()
  const { manageModal } = useModals()

  const { distance } = calculateDistance(
    formatObjectCoords(data?.geometry.location),
    formatObjectCoords(currentPosition),
  )

  const handleOnLike = () => {
    if (isLocked) {
      manageModal('user', true)
    } else {
      console.log({
        props,
      })
    }
  }

  if (mode === 'small') {
    return (
      <_Small
        {...props}
        distance={distance}
        onClick={() => manageModal('details', true)}
        onLike={handleOnLike}
      />
    )
  } else {
    return <_Card {...props} distance={distance} onLike={handleOnLike} />
  }
}

export default Restaurant
