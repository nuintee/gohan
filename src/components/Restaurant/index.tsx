import { Coords } from '@/constants/coords'
import useRestaurantSearch from '@/hooks/API/restaurant'
import { useMapBox } from '@/hooks/context'
import useGPS from '@/hooks/context/GPS'
import useRestaurants from '@/hooks/context/Restaurants'
import { ResultsEntity } from '@/hooks/context/Restaurants/types'
import { Close } from '@/icons'
import { RestaurantProps } from '@/types/Restaurant'
import { useEffect } from 'react'
import { Regular } from '../Button'
import Label from './Label'
import { Like } from './Like'
import Texts from './Texts'

const Small = (props: RestaurantProps & { distance: string }) => {
  const { data, distance, onLike, isLiked, isLocked } = props
  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={() => {}}
    >
      <img
        src={
          data?.photos?.length
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
            : 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
        }
        className='max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md'
        alt={'image'}
      />

      <div className='flex flex-1 gap-4 items-start'>
        <div className='flex flex-col gap-2'>
          <Texts main={data?.name || 'NAME'} sub={data?.types?.join('・')} size='small' />
          <Label distance={distance || 'N/A m'} />
        </div>
        <Like onClick={onLike} isLiked={isLiked} isLocked={isLocked} />
      </div>
    </div>
  )
}

const Card = (
  props: RestaurantProps & {
    distance: string
    isNavigating: boolean
    isLoading: boolean
    onLike: Function
    onNavigate: Function
  },
) => {
  const { distance, data, isLiked, isLoading, onLike, onNavigate, isNavigating, isLocked } = props
  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white'>
      <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={() => {}}>
        <Close fill={'#000'} />
      </button>
      <img
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`}
        className={`select-none max-h-52 w-full object-cover h-52`}
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label distance={distance || 'N/A m'} extraClassName={''} />
        <Texts main={data?.name || 'NAME'} sub={data?.types?.join('・')} />
        {data?.reference && (
          <p className='bg-gh-l-orange text-center p-4 rounded-md'>
            Checkout more data from{' '}
            <a href='' className='text-gh-orange font-semibold'>
              Here
            </a>
          </p>
        )}
        <footer className='flex w-full gap-4'>
          {/* Footer */}
          <Regular
            text={isNavigating ? 'Stop Navigation' : 'Navigate'}
            loading={isLoading}
            onClick={onNavigate}
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
  const { mode, data, isLiked, isLocked } = props
  const { calculateDistance, currentPosition } = useGPS()
  const { formatObjectCoords } = useRestaurantSearch()

  const { distance } = calculateDistance(
    formatObjectCoords(data?.geometry.location),
    formatObjectCoords(currentPosition),
  )

  return <div>Restaurant</div>
}

export default Restaurant
