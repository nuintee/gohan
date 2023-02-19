import React, { useEffect, useMemo, useState } from 'react'

// Function
import calculateDistance from '@/libs/haversine-distance'

// Components
import PanelHeader from '@/components/ui/PanelHeader'
import { useSession } from 'next-auth/react'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import RestaurantBoard from '@/features/restaurants/components/RestaurantBoard'
import useMapBox from '@/features/mapbox/hooks'
import { DropDown } from '@/components/ui'
import { Dots } from '@/components/icons'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import ActivityDropDown from './ActivityDropDown'

type Props = {
  isOpen?: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
}

const ContentsRenderer = ({
  userActivities,
}: {
  userActivities: ReturnType<typeof useGetUserActivities>
}) => {
  const { onActivityClicked, mapbox } = useMapBox()
  // Query

  if (userActivities.isFetching) {
    return <div>Loading...</div>
  }

  if (userActivities.data && userActivities.data?.length <= 0) {
    return <div>Empty</div>
  }

  return (
    <div className='flex flex-col gap-2 p-2'>
      {userActivities.data?.map((activity) => (
        <div className='flex gap-2 items-center justify-between' key={activity.id}>
          <RestaurantBoard
            data={activity}
            onClick={() => onActivityClicked(activity)}
            isFocused={mapbox.focusedPlaceId === activity.place_id}
            isLocked={false}
          />
          <ActivityDropDown activity={activity} onMutated={() => userActivities.refetch()} />
        </div>
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { status, data: session } = useSession()

  // Query
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const { isOpen = isPanelOpen ?? true, onClose = closePanel } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[1000]  shadow-md ${slideIn}`}
    >
      <PanelHeader title={'ライブラリ'} onClose={onClose} />
      <hr></hr>
      <ContentsRenderer userActivities={getUserAll} />
    </div>
  )
}

export default ActivityPanel
