import { Button } from '@/components/ui'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import Pin from '@/features/mapbox/components/MarkerPin'
import useMapBox from '@/features/mapbox/hooks'
import useMediaQuery from '@/hooks/mediaquery'
import { useState } from 'react'
import useDetails from '../../hooks/useDetails'
import KeyFeaturesSection from './KeyFeaturesSection'
import LocationSection from './LocationSection'
import ReviewsSection from './ReviewsSection'

const DetailsSectionGroup = ({
  data,
  isLoading,
}: {
  data: ReturnType<typeof useDetails>['data']
  isLoading: boolean
}) => {
  const { onActivityClicked } = useMapBox()
  const isOverMedium = useMediaQuery('md')

  // local state
  const [showFullMap, setShowFullMap] = useState(false)

  function handleMapBoxClick() {
    if (!isOverMedium) {
      setShowFullMap(true)
    }
  }

  return (
    <>
      <KeyFeaturesSection data={data} isLoading={isLoading} />
      <LocationSection
        data={data}
        isLoading={isLoading}
        showFullMap={showFullMap}
        onMapClick={handleMapBoxClick}
      />
      <ReviewsSection data={data} isLoading={isLoading} />
      {showFullMap && !isOverMedium && (
        <div className='flex-1 relative'>
          <div className='fixed top-0 left-0 w-screen h-screen z-[100]'>
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
            <div className={`absolute right-4 top-4 text-xs flex flex-col gap-2`}>
              <Button text='閉じる' onClick={() => setShowFullMap(false)} />
              <Button text='地点をフォーカス' onClick={() => onActivityClicked(data)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailsSectionGroup
