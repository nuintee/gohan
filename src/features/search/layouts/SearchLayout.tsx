import { Button, GohanButton } from '@/components/ui'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useGPS from '@/hooks/gps'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import LocationLoader from '../components/LocationLoader'

const SearchLayout = ({
  trigger = false,
  onClose,
}: {
  trigger?: boolean
  onClose?: () => void
}) => {
  const queryClient = useQueryClient()
  const { gps, updateGeolocationStatus, updateSafeGeolocation } = useGPS()

  const handleCancel = () => {
    queryClient.cancelQueries()
    onClose && onClose()
  }

  useEffect(() => {
    if (!gps.isFetching) return

    const watchId = navigator.geolocation.watchPosition(
      ({ timestamp, coords }) => {
        updateSafeGeolocation({
          coords,
          timestamp,
          isFetching: false,
        })
      },
      () => {
        updateGeolocationStatus({ isError: true, isFetching: false })
      },
      {
        enableHighAccuracy: true,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const restaurants = useRestaurants({
    latitude: gps.coords.latitude as number,
    longitude: gps.coords.longitude as number,
    trigger,
    errorCallback: () => onClose && onClose(),
  })

  // Style
  const absoluteStyle = restaurants.isFetching && 'h-screen w-screen fixed top-0'

  const textUI = () => {
    if (restaurants.isFetching) {
      return 'ピッタリのレストランを探しています。'
    } else {
      return !trigger && '「どこで食べようかな」を解決'
    }
  }

  return (
    <div
      className={`flex flex-1 flex-col gap-4 items-center justify-center bg-white duration-700 ease-in-out ${absoluteStyle}`}
      data-testid='search__layout'
    >
      {/* Layout */}
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h1
          className={`text-xl font-semibold sm:text-4xl ${
            restaurants.isFetching && 'animate-fadeIn'
          }`}
        >
          {textUI()}
        </h1>
        {!restaurants.isFetching && !trigger && (
          <p className='text-gh-d-gray sm:text-lg text-md'>クリックしてGohanする</p>
        )}
      </div>
      <GohanButton
        onClick={() => restaurants.refetch()}
        isLoading={restaurants.isFetching}
        disabled={restaurants.isFetching || gps.isFetching}
      />
      <LocationLoader isLoading={gps.isFetching} isError={gps.isError} error={gps.error} />
      {restaurants.isFetching && (
        <div className='absolute mt-4 bottom-8'>
          <Button text='キャンセル' onClick={handleCancel} outline />
        </div>
      )}
    </div>
  )
}

export default SearchLayout
