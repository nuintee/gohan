import React, { useState } from 'react'

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
import { ConditionsWithALL, useFilter } from '@/hooks/filter'
import { ReviewStatus } from '@prisma/client'
import { SORT_ENUM, SortMethods, SORT_METHODS } from '@/constants/sort'
import mapActivityStatus from '../hooks/mapActivityStatus'
import { Sort, Filter } from '@/components/icons'

const SORT_MENU = [
  {
    label: '名前',
    key: 'name',
    options: SORT_METHODS,
  },
  {
    label: '追加日時',
    key: 'discovered_at',
    options: SORT_METHODS,
  },
]

const ContentsRenderer = ({ query }: { query: ReturnType<typeof useGetUserActivities> }) => {
  const { onActivityClicked, mapbox } = useMapBox()
  const [deletedContents, setDeletedContents] = useState<NonNullable<typeof query.data>>([])

  const [sortOptions, setSortOptions] = useState<{
    sortKey: keyof NonNullable<typeof query.data>[number]
    sortMethod: SortMethods
  }>({
    sortKey: 'discovered_at',
    sortMethod: 'ASC',
  })
  const [filterStatus, setFilterStatus] = useState<ConditionsWithALL<ReviewStatus>>('ALL')

  const sortedArray = useSort({
    array: query.data,
    sortMethod: sortOptions.sortMethod,
    sortKey: sortOptions.sortKey,
    disabled: false,
  })

  function sortValueMapper(status: ConditionsWithALL<ReviewStatus>) {
    switch (status) {
      case 'ALL':
        return '全て'
      default:
        return mapActivityStatus(status).label
    }
  }

  const filteredArray = useFilter({
    array: sortedArray,
    filterFn: (v) => v.reviewStatus === filterStatus,
    disabled: filterStatus === 'ALL',
  })

  if (query.isFetching && !query.isFetched) {
    const COUNT = 3
    const DUMMIES = Array(COUNT).fill(null)

    return (
      <div className='flex flex-col flex-1' data-testid='activity_panel_loading__fallback'>
        {DUMMIES.map((_v, i) => (
          <div
            className='bg-gh-l-gray max-h-24 flex-1 animate-pulse rounded-md m-4 mb-0'
            key={i}
          ></div>
        ))}
      </div>
    )
  }

  if (query.isError) {
    return <ErrorFallBack error={query.error} fullScreen={false} backToHome={false} />
  }

  if ((query.data && query.data?.length <= 0) || deletedContents.length === query.data?.length) {
    console.log({ deletedContents })
    return (
      <div
        className='flex-1 p-4 flex items-center justify-center'
        data-testid='activity_panel_nodata__fallback'
      >
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
    <div
      className='flex-1 flex flex-col gap-2  overflow-auto p-2 pb-20'
      data-testid='activity__panel_contents'
    >
      <header className='flex gap-2'>
        <DropDown
          menu={SORT_MENU.flatMap((v) =>
            v.options.map((method) => ({
              testId: `dropdown_item_${v.key}_${method}`,
              label: `${v.label}: ${SORT_ENUM[method].label}`,
              onDropDownItemClick: () =>
                setSortOptions((_prev) => ({
                  sortKey: v.key as typeof sortOptions.sortKey,
                  sortMethod: method,
                })),
            })),
          )}
          controller={
            <Button
              text={`${SORT_MENU.find((v) => v.key === sortOptions.sortKey)?.label || ''}: ${
                SORT_ENUM[sortOptions.sortMethod].label
              }`}
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
            testId: `dropdown_item_filter_${v}`,
            label: sortValueMapper(v as ConditionsWithALL<ReviewStatus>),
            onDropDownItemClick: () => setFilterStatus(v as ConditionsWithALL<ReviewStatus>),
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
        ?.filter((v) => !deletedContents.includes(v.id as keyof typeof query.data))
        .map((activity, index, original) => (
          <div
            className='flex gap-2 items-center justify-between'
            key={activity.id}
            data-testid={`activity_panel__content_order_${index}`}
          >
            <RestaurantBoard
              data={activity}
              onClick={() => onActivityClicked(activity)}
              isFocused={mapbox.focusedPlaceId === activity.place_id}
              isLocked={false}
            />
            <ActivityDropDown
              activity={activity}
              onMutated={() => {
                setDeletedContents((prev) => [...prev, activity.id] as typeof deletedContents)
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
    <SlideInLayout
      isOpen={isPanelOpen}
      maxWidth={maxWidth}
      testId={`activity__panel_is_${isPanelOpen}`}
    >
      <>
        <PanelHeader title='ライブラリ' onClose={closePanel} />
        <hr></hr>
        <ContentsRenderer query={query} />
      </>
    </SlideInLayout>
  )
}

export default ActivityPanel
