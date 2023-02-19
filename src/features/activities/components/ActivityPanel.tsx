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
import { useRecoilState } from 'recoil'
import { mapBoxState } from '@/features/mapbox/stores'
import useMapBox from '@/features/mapbox/hooks'
import { DropDown } from '@/components/ui'
import { Dots } from '@/components/icons'
import { useRouter } from 'next/router'

type Props = {
  isOpen?: boolean
  data?: ActivityResolved[]
  onClose?: React.MouseEventHandler<HTMLButtonElement>
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { status, data: session } = useSession()
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })
  const router = useRouter()

  const {
    isOpen = isPanelOpen ?? false,
    onClose = closePanel,
    data = getUserAll.data ?? [],
  } = props

  const { onActivityClicked, mapbox } = useMapBox()

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[1000]  shadow-md ${slideIn}`}
    >
      <PanelHeader title={'ライブラリ'} onClose={onClose} />
      <hr></hr>
      <div className='p-4 flex-1 overflow-auto'>
        {getUserAll.data?.map((activity) => (
          <div className='flex gap-2 items-center justify-between' key={activity.id}>
            <RestaurantBoard
              data={activity}
              compact
              onClick={() => onActivityClicked(activity)}
              isFocused={mapbox.focusedPlaceId === activity.place_id}
            />
            <DropDown
              text=''
              menu={[
                {
                  label: '詳細を表示',
                  onDropDownItemClick: () => {
                    router.push(`/details/${activity.place_id}`)
                  },
                },
              ]}
              square
              outline
              icon={{
                position: 'after',
                src: <Dots />,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityPanel
