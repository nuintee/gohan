import { Coords } from '@/constants/coords'
import useGPS from '@/hooks/context/GPS'
import useRestaurants from '@/hooks/context/Restaurants'
import { ResultsEntity } from '@/hooks/context/Restaurants/types'
import { RestaurantProps } from '@/types/Restaurant'
import { useEffect } from 'react'
import Label from './Label'
import { Like } from './Like'
import Texts from './Texts'

type _CoordObject = Coords | { lat: number | null; lng: number | null }

const _formatObjectCoords = (coordObject: _CoordObject): number[] => {
  return Object.keys(coordObject)
    .sort()
    .map((k) => coordObject[k])
}

const Restaurant = (props: RestaurantProps) => {
  const { mode, data, is_liked } = props
  const { calculateDistance, currentPosition } = useGPS()

  if (!data) return <></>

  const distance = calculateDistance(
    _formatObjectCoords(data.geometry.location),
    _formatObjectCoords(currentPosition),
  )

  const onLike = () => {}

  if (mode === 'small') {
    return (
      <div
        className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
        onClick={() => {}}
      >
        <img
          src={
            photos?.length
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
              : 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
          }
          className='max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md'
          alt={'image'}
        />

        <div className='flex flex-1 gap-4 items-start'>
          <div className='flex flex-col gap-2'>
            <Texts main={data.name || 'NAME'} sub={data.types?.join('・')} size='small' />
            <Label distance={distance.m} />
          </div>
          <Like onClick={onLike} state={is_liked ? 'LIKED' : 'UNLIKED'} />
        </div>
      </div>
    )
  } else {
    return (
      <div
        className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
        onClick={() => {}}
      >
        <img
          src={
            data.photos?.length
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
              : 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
          }
          className='max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md'
          alt={'image'}
        />

        <div className='flex flex-1 gap-4 items-start'>
          <div className='flex flex-col gap-2'>
            <Texts main={data.name || 'NAME'} sub={data.types?.join('・')} size='small' />
            <Label distance={2000} />
          </div>
          <Like onClick={onLike} state={is_liked ? 'LIKED' : 'UNLIKED'} />
        </div>
      </div>
    )
  }
}

export default Restaurant
