import { Button } from '@/components/ui'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import Pin from '@/features/mapbox/components/MarkerPin'
import useMapBox from '@/features/mapbox/hooks'
import useGPS from '@/hooks/gps'
import useMediaQuery from '@/hooks/mediaquery'
import haversineDistance from '@/libs/haversine-distance'
import useDetails from '../../hooks/useDetails'
import DetailsSection from '../../layouts/DetailsSection'

const LocationSection = ({
  data,
  isLoading = false,
  showFullMap,
  onMapClick,
}: {
  data: ReturnType<typeof useDetails>['data']
  isLoading?: boolean
  showFullMap: boolean
  onMapClick: () => void
}) => {
  const { onActivityClicked, mapBoxRef } = useMapBox()
  const { gps, isGPSFetching, isGPSError } = useGPS()
  const isOverMedium = useMediaQuery('md')

  const distanceDecoration = () => {
    if (isGPSFetching || isGPSError) return ''

    const distance = haversineDistance(
      {
        lat: gps.coords.latitude as number,
        lng: gps.coords.longitude as number,
      },
      {
        lat: data?.geometry?.location.lat as number,
        lng: data?.geometry?.location.lng as number,
      },
    )

    if (!distance.raw || Number.isNaN(distance.raw)) return ''

    return distance.auto
  }

  return (
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
      <div className='flex-1 aspect-video w-full relative' onClick={onMapClick}>
        {!Boolean(showFullMap && !isOverMedium) && (
          <MapBoxChip
            latitude={data?.geometry?.location.lat}
            longitude={data?.geometry?.location.lng}
            dragPan={isOverMedium}
            scrollZoom={false}
            trackUserLocation={isOverMedium}
          >
            <Pin
              latitude={data?.geometry?.location.lat}
              longitude={data?.geometry?.location.lng}
              data={data}
              focused={false}
            />
          </MapBoxChip>
        )}
        {isOverMedium && (
          <div className={`absolute right-4 top-4 text-xs flex flex-col gap-2`}>
            <Button text='地点をフォーカス' onClick={() => onActivityClicked(data)} />
            <Button
              text='+ ズームイン'
              onClick={() => mapBoxRef?.zoomTo(mapBoxRef.getZoom() + 1)}
            />
            <Button
              text='- ズームアウト'
              onClick={() => mapBoxRef?.zoomTo(mapBoxRef.getZoom() - 1)}
            />
          </div>
        )}
      </div>
    </DetailsSection>
  )
}

export default LocationSection
