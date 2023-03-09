import { Button } from '@/components/ui'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import Pin from '@/features/mapbox/components/MarkerPin'
import useMapBox from '@/features/mapbox/hooks'
import useGPS from '@/hooks/gps'
import ModalLayout from '@/layouts/ModalLayout'
import haversineDistance from '@/libs/haversine-distance'
import { useState } from 'react'
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
  const { onActivityClicked } = useMapBox()
  const { gps, isGPSFetching, isGPSError } = useGPS()

  // localstates
  const [showMap, setShowMap] = useState(false)

  const distanceDecoration = () => {
    if (isGPSFetching || isGPSError) return ''

    const distance = haversineDistance(gps.coords, {
      lat: data?.geometry?.location.lat,
      lng: data?.geometry?.location.lng,
    })

    return distance.auto
  }

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
        mainDecoration={
          distanceDecoration() && <p className='text-gh-gray'>{distanceDecoration()}</p>
        }
      >
        <div className='flex-1 aspect-video w-full relative'>
          {!showMap && (
            <div
              className='absolute top-0 left-0 w-full h-full z-10 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center cursor-pointer'
              onClick={() => setShowMap(true)}
            >
              <div className='w-fit h-fit bg-white rounded-md'>
                <Button text='マップを見る' outline />
              </div>
            </div>
          )}
          <MapBoxChip
            latitude={data?.geometry?.location.lat}
            longitude={data?.geometry?.location.lng}
            dragPan={true}
            scrollZoom={false}
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
      <ModalLayout isOpen={showMap} onRequestClose={() => setShowMap(false)}>
        <div className='h-screen w-screen'>
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
            <Button text='閉じる' onClick={() => setShowMap(false)} />
          </div>
        </div>
      </ModalLayout>
    </>
  )
}

export default DetailsSectionGroup
