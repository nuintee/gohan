import { ActivityResolved } from '@/features/activities/types'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import DetailsSection from '../../layouts/DetailsSection'

const DetailsSectionGroup = ({
  data,
  isLoading,
}: {
  data: ActivityResolved
  isLoading: boolean
}) => {
  return (
    <>
      <DetailsSection margin='5rem' main='ロケーション' sub={data?.vicinity} isLoading={isLoading}>
        <div className='flex-1 aspect-video w-full'>
          <MapBoxChip
            latitude={data?.geometry?.location.lat}
            longitude={data?.geometry?.location.lng}
          />
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
