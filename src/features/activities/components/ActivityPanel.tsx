import React, { useState } from 'react'

// Function

// Components
import PanelHeader from '@/components/ui/PanelHeader'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import RestaurantBoard from '@/features/restaurants/components/RestaurantBoard'
import useMapBox from '@/features/mapbox/hooks'
import { Button, DropDown, Texts } from '@/components/ui'
import ActivityDropDown from './ActivityDropDown'
import SlideInLayout from '@/layouts/SlideInLayout'
import useMediaQuery from '@/hooks/mediaquery'
import ErrorFallBack from '@/components/fallback/ErrorFallback'
import { useSort } from '@/hooks/sort'
import { useFilter } from '@/hooks/filter'
import { ReviewStatus } from '@prisma/client'
import { SORT_ENUM } from '@/constants/sort'
import useActivityStatus from '../hooks/useActivityStatus'
import { Sort, Filter } from '@/components/icons'

const ContentsRenderer = ({ query }: { query: ReturnType<typeof useGetUserActivities> }) => {
  const { onActivityClicked, mapbox } = useMapBox()
  const [deletedContents, setDeletedContents] = useState([])

  const [sortMethod, setSortMethod] = useState<keyof typeof SORT_ENUM>('DESC')
  const [filterStatus, setFilterStatus] = useState<'ALL' | ReviewStatus>('ALL')

  const sortedArray = useSort({
    array: query.data,
    sortMethod,
    sortKey: 'name',
    disabled: false,
  })

  function sortValueMapper(status: 'ALL' | ReviewStatus) {
    switch (status) {
      case 'ALL':
        return '全て'
      default:
        return useActivityStatus(status).label
    }
  }

  const filteredArray = useFilter({
    array: sortedArray,
    filterFn: (v) => v.reviewStatus === filterStatus,
    disabled: filterStatus === 'ALL',
  })

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
    <div className='flex-1 flex flex-col gap-2  overflow-auto p-2 pb-20'>
      <header className='flex gap-2'>
        <DropDown
          menu={Object.keys(SORT_ENUM).map((v) => ({
            label: SORT_ENUM[v].label,
            onDropDownItemClick: () => setSortMethod(v),
          }))}
          controller={
            <Button
              text={`名前: ${SORT_ENUM[sortMethod].label}`}
              outline
              icon={{
                position: 'before',
                src: <Sort />,
              }}
            />
          }
          ignored={false}
        />
        <DropDown
          menu={Object.keys({ ...ReviewStatus, ALL: 'ALL' }).map((v) => ({
            label: sortValueMapper(v as 'ALL' | ReviewStatus),
            onDropDownItemClick: () => setFilterStatus(v),
          }))}
          controller={
            <Button
              text={sortValueMapper(filterStatus)}
              outline
              icon={{
                position: 'before',
                src: <Filter />,
              }}
            />
          }
          ignored={false}
        />
      </header>
      {filteredArray
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
