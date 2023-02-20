import { GohanButton } from '@/components/ui'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useGPS from '@/hooks/gps'
import LocationLoader from './LocationLoader'

const SearchLayout = ({ trigger = false }: { trigger?: boolean }) => {
  const { gps } = useGPS()

  const restaurants = useRestaurants({
    latitude: gps.coords.latitude,
    longitude: gps.coords.longitude,
  })

  // Style
  const absoluteStyle = restaurants.isFetching && 'h-screen w-screen absolute'

  return (
    <div
      className={`flex flex-1 flex-col gap-4 items-center justify-center bg-white duration-700 ease-in-out ${absoluteStyle}`}
    >
      {/* Layout */}
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-4xl font-semibold'>
          {restaurants.isFetching
            ? 'あなたにピッタリのレストランを探しています。'
            : '「どこで食べようかな」を解決'}
        </h1>
        {!restaurants.isFetching && <p className='text-gh-d-gray text-lg'>クリックしてGohanする</p>}
      </div>
      <GohanButton
        onClick={() => restaurants.refetch()}
        isLoading={restaurants.isFetching}
        disabled={restaurants.isFetching || gps.isFetching}
      />
      <LocationLoader isLoading={gps.isFetching} isError={gps.isError} error={gps.error} />
    </div>
  )
}

export default SearchLayout
