import { Button } from '@/components/ui'
import { ActivityResolved } from '@/features/activities/types'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import Pin from '@/features/mapbox/components/MarkerPin'
import useMapBox from '@/features/mapbox/hooks'
import { useRouter } from 'next/router'
import DetailsSection from '../../layouts/DetailsSection'

const DetailsSectionGroup = ({
  data,
  isLoading,
}: {
  data: ActivityResolved
  isLoading: boolean
}) => {
  const { onActivityClicked, mapbox } = useMapBox()

  return (
    <>
      <DetailsSection margin='5rem' main='ロケーション' sub={data?.vicinity} isLoading={isLoading}>
        <div className='flex-1 aspect-video w-full relative'>
          <MapBoxChip
            latitude={data?.geometry?.location.lat}
            longitude={data?.geometry?.location.lng}
          >
            <Pin
              latitude={data?.geometry?.location.lat}
              longitude={data?.geometry?.location.lng}
              data={data}
              focused={false}
            />
          </MapBoxChip>
          <div className='absolute right-4 top-4'>
            <Button text='マップ上で表示' onClick={() => onActivityClicked(data)} />
          </div>
        </div>
      </DetailsSection>
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DetailsSection
          margin='5rem'
          main={`レビュー・${data?.rating}`}
          sub={`${data?.user_ratings_total}件のレビュー`}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default DetailsSectionGroup
