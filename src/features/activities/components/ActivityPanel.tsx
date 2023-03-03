import React, { useState } from 'react'

// Function

// Components
import PanelHeader from '@/components/ui/PanelHeader'
import { useSession } from 'next-auth/react'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import RestaurantBoard from '@/features/restaurants/components/RestaurantBoard'
import useMapBox from '@/features/mapbox/hooks'
import { Texts } from '@/components/ui'
import ActivityDropDown from './ActivityDropDown'
import SlideInLayout from '@/layouts/SlideInLayout'
import useMediaQuery from '@/hooks/mediaquery'
import ErrorFallBack from '@/components/fallback/ErrorFallback'

type Props = {
  isOpen?: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  query?: ReturnType<typeof useGetUserActivities>
}

const ContentsRenderer = ({ query }: { query: ReturnType<typeof useGetUserActivities> }) => {
  const { onActivityClicked, mapbox } = useMapBox()
  const [deletedContents, setDeletedContents] = useState([])

  if (query.isFetching && !query.isFetched) {
    const COUNT = 3
    const DUMMIES = [...Array(COUNT).keys()]

    return (
      <div className='flex flex-col flex-1'>
        {DUMMIES.map((v, i) => (
          <div
            className='bg-gh-l-gray max-h-24 flex-1 animate-pulse rounded-md m-4 mb-0'
            key={i}
          ></div>
        ))}
      </div>
    )
  }

  if (query.isError) {
    return <ErrorFallBack error={query.error} />
  }

  if ((query.data && query.data?.length <= 0) || deletedContents.length === query.data?.length) {
    console.log({ deletedContents })
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
    <div className='flex-1 flex flex-col  overflow-auto p-2 pb-20'>
      {query.data
        ?.filter((v) => !deletedContents.includes(v.id))
        .map((activity, index, original) => (
          <div className='flex gap-2 items-center justify-between' key={activity.id}>
            <RestaurantBoard
              data={activity}
              onClick={() => onActivityClicked(activity)}
              isFocused={mapbox.focusedPlaceId === activity.place_id}
              isLocked={false}
            />
            <ActivityDropDown
              activity={activity}
              onMutated={() => {
                setDeletedContents((prev) => [...prev, activity.id])
              }}
              direction={
                original.length > 1 && index === original.length - 1 ? 'left-bottom' : 'bottom'
              }
            />
          </div>
        ))}
    </div>
  )
}

const ActivityPanel = () => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { data: session } = useSession()

  // MediaQuery
  const isOverSmall = useMediaQuery('sm')
  const maxWidth = !isOverSmall ? '20rem' : '30rem'

  // Query
  const query = useGetUserActivities()

  return (
    <SlideInLayout isOpen={isPanelOpen} onClose={closePanel} maxWidth={maxWidth}>
      <>
        <PanelHeader title='ライブラリ' onClose={closePanel} />
        <hr></hr>
        <ContentsRenderer query={query} />
      </>
    </SlideInLayout>
  )
}

export default ActivityPanel
