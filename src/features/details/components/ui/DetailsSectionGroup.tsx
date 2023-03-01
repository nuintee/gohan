import { Check } from '@/components/icons'
import { Button } from '@/components/ui'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import { ActivityResolved } from '@/features/activities/types'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import Pin from '@/features/mapbox/components/MarkerPin'
import useMapBox from '@/features/mapbox/hooks'
import { useRouter } from 'next/router'
import DetailsSection from '../../layouts/DetailsSection'
import KeyFeaturesSection from './KeyFeaturesSection'
import ReviewsSection from './ReviewsSection'

const DetailsSectionGroup = ({
  data,
  isLoading,
}: {
  data: ReturnType<typeof useGetActivity>['data']
  isLoading: boolean
}) => {
  const { onActivityClicked, mapbox } = useMapBox()

  return (
    <>
      <KeyFeaturesSection data={data} isLoading={isLoading} />
      <DetailsSection
        margin='5rem'
        main='ロケーション'
        sub={data?.vicinity}
        isLoading={isLoading}
        allowCopy
        copyValue={data?.vicinity}
      >
        <div className='flex-1 aspect-video w-full relative'>
          <MapBoxChip
            latitude={data?.geometry?.location.lat}
            longitude={data?.geometry?.location.lng}
            dragPan={true}
            scrollZoom={true}
          >
            <Pin
              latitude={data?.geometry?.location.lat}
              longitude={data?.geometry?.location.lng}
              data={data}
              focused={false}
            />
          </MapBoxChip>
          <div className='absolute right-4 top-4 text-xs'>
            <Button text='マップ上で表示' onClick={() => onActivityClicked(data)} />
          </div>
        </div>
      </DetailsSection>
      <ReviewsSection data={data} isLoading={isLoading} />
    </>
  )
}

export default DetailsSectionGroup
