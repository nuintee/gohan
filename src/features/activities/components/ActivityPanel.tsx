import React, { useEffect, useMemo, useState } from 'react'

// Function
import calculateDistance from '@/libs/haversine-distance'

// Components
import PanelHeader from '@/components/ui/PanelHeader'
import { Activity } from '@prisma/client'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import { ActivityResolved } from '../types'
import { useSession } from 'next-auth/react'
import { QueryClient, UseMutationResult } from '@tanstack/react-query'
import useModals from '@/hooks/modals'
import usePatchActivity from '../hooks/usePatchActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import useExperimentalRestaurants from '@/features/restaurants/hooks/useRestaurants'
import RestaurantBoard from '@/features/restaurants/components/RestaurantBoard'
import MapBoxCore from '@/features/mapbox/components/MapBoxChip'
import MapBox from '@/features/mapbox/components/MapBox'

type Props = {
  isOpen?: boolean
  data?: ActivityResolved[]
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  onClickItem: (item: ActivityResolved) => void
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { status, data: session } = useSession()
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const {
    isOpen = isPanelOpen ?? false,
    onClose = closePanel,
    data = getUserAll.data ?? [],
    onClickItem,
  } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[1000]  shadow-md ${slideIn}`}
    >
      <PanelHeader title={'ライブラリ'} onClose={onClose} />
      <hr></hr>
      <div className='p-4 flex-1 overflow-auto'>
        {getUserAll.data?.map((activity) => (
          <RestaurantBoard data={activity} compact onClick={() => onClickItem(activity)} />
        ))}
      </div>
    </div>
  )
}

export default ActivityPanel
