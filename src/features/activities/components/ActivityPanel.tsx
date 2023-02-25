import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Function
import calculateDistance from '@/libs/haversine-distance'

// Components
import PanelHeader from '@/components/ui/PanelHeader'
import { useSession } from 'next-auth/react'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import RestaurantBoard from '@/features/restaurants/components/RestaurantBoard'
import useMapBox from '@/features/mapbox/hooks'
import { DropDown, Texts } from '@/components/ui'
import { Dots } from '@/components/icons'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import ActivityDropDown from './ActivityDropDown'

type Props = {
  isOpen?: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  query?: ReturnType<typeof useGetUserActivities>
}

const ContentsRenderer = ({
  userActivities,
}: {
  userActivities: ReturnType<typeof useGetUserActivities>
}) => {
  const { onActivityClicked, mapbox } = useMapBox()

  if (userActivities.isFetching) {
    const COUNT = 3

    return Array(COUNT)
      .fill(null)
      .map((v) => (
        <div className='bg-gh-l-gray h-24 w-[20rem] animate-pulse rounded-md m-4 mb-0'></div>
      ))
  }

  if (userActivities.data && userActivities.data?.length <= 0) {
    return (
      <div className='flex-1 p-4 flex items-center justify-center'>
        <Texts
          main='データがありません。'
          sub={'Gohanをして、早速新しい場所を発見しましょう。'}
          size={'small'}
          textAlign='center'
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 p-2 flex-1 overflow-y-auto overflow-x-hidden'>
      {userActivities.data?.map((activity, index, original) => (
        <div className='flex gap-2 items-center justify-between' key={activity.id}>
          <RestaurantBoard
            data={activity}
            onClick={() => onActivityClicked(activity)}
            isFocused={mapbox.focusedPlaceId === activity.place_id}
            isLocked={false}
          />
          <ActivityDropDown
            activity={activity}
            onMutated={() => userActivities.refetch()}
            direction={
              original.length > 1 && index === original.length - 1 ? 'left-bottom' : 'bottom'
            }
          />
        </div>
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { data: session } = useSession()

  // Query
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const { isOpen = isPanelOpen ?? true, onClose = closePanel, query = getUserAll } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen overflow-hidden bg-white flex max-w-screen flex-col duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[1000] shadow-md ${slideIn}`}
    >
      <PanelHeader title='ライブラリ' onClose={onClose} />
      <hr></hr>
      <ContentsRenderer userActivities={query} />
    </div>
  )
}

export default ActivityPanel
