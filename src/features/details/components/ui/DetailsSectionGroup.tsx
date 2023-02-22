import { Button } from '@/components/ui'
import { ActivityResolved } from '@/features/activities/types'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
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
  const router = useRouter()

  const handleShowMap = () => {
    router.push('/library')
  }

  return (
    <>
      <DetailsSection
        margin='5rem'
        main='ロケーション'
        sub={data?.vicinity}
        isLoading={isLoading}
        actionLabel={'ライブラリマップで表示'}
        actionCallback={handleShowMap}
      >
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
