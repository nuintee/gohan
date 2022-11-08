import Image from 'next/image'

import { Regular } from '../Button'
import Texts from './Texts'
import Label from './Label'
import { Like, states } from './Like/index'

// Hooks
import { useGeoLocation } from '@/hooks/context'

// Types
import { ResultsEntity } from '@/hooks/API/Places/types/index.types'

// Constants
import { colors } from 'config/tailwind'

// Icons
import { Close } from '@/icons'
import { useEffect, useState } from 'react'

type Props = {
  state: typeof states[number]
  info: ResultsEntity
  onNavigate: React.MouseEventHandler<HTMLDivElement>
  onClose: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onLike: React.MouseEventHandler<HTMLButtonElement>
}

const Large = (props: Props) => {
  const { state, onLike, onNavigate, onClose, info, isLoading } = props
  const { geoState, calculateDistance } = useGeoLocation()
  const distance = calculateDistance(info?.geometry?.location, geoState)

  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white'>
      <button className='absolute left-[1rem] top-[1rem] outline-none' onClick={onClose}>
        <Close fill={colors['gh-white']} />
      </button>
      <img
        src={
          info?.photos?.length
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${info?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
            : 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
        }
        className='select-none max-h-52 w-full object-cover'
        draggable={false}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label distance={distance} />
        <Texts main={info?.name || 'NAME'} sub={info?.types?.join('・') || 'Types・Pros'} />
        {info?.url && (
          <p className='bg-gh-l-orange text-center p-4 rounded-md'>
            Checkout more info from{' '}
            <a href='' className='text-gh-orange font-semibold'>
              Here
            </a>
          </p>
        )}
        <footer className='flex w-full gap-4'>
          {/* Footer */}
          <Regular text={'Navigate'} loading={isLoading} onClick={onNavigate} />
          <Like state={state} onClick={onLike} />
        </footer>
      </div>
    </div>
  )
}

const Small = (props: Props) => {
  const { state, onClick, onLike, info } = props
  const { geoState, calculateDistance } = useGeoLocation()
  const distance = calculateDistance(info?.geometry?.location, geoState)

  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={onClick}
    >
      <img
        src={
          info?.photos?.length
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${info?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GCP_API_KEY}`
            : 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
        }
        className='max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md'
        alt={'image'}
      />
      <div className='flex flex-1 gap-4 items-start'>
        <div className='flex flex-col gap-2'>
          <Texts main={info?.name || 'NAME'} sub={info?.types?.join('・')} size='small' />
          <Label distance={distance} />
        </div>
        <Like onClick={onLike} state={state} />
      </div>
    </div>
  )
}

const Restaurant = {
  Large,
  Small,
}

export { Restaurant, Like }
