import { GohanButton, ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import { trpc } from '@/libs/trpc'

// ENV
import useToast from '@/libs/react-toastify'
import useGetRestaurants from '@/features/restaurants/hooks/useRestaurants/useGetRestaurants'
import useClearRestaurant from '@/features/restaurants/hooks/useRestaurants/useClearRestaurant'
import useRestaurantDetails from '@/features/restaurants/hooks/useRestaurantDetails'

const PlayGround = () => {
  // Restaurants [OK]
  const getRestaurants = trpc.getRestaurant.useQuery({
    latitude: 42.64775203224244,
    longitude: 23.40559939582422,
  })
  const clearRestaurants = useClearRestaurant()
  const getRestaurantDetail = useRestaurantDetails({ place_id: 'ChIJzdIWCP2GqkAR4wCobfmZAvo' })

  // Trpc
  const getActivity = trpc.getActivity.useQuery({
    activityId: '0cad9849-cfea-46c4-9821-39691838986b',
  })
  const getUserActivities = trpc.getUserActivities.useQuery({
    userId: '4269df99-cb99-42c1-9c92-9a7e854e7327',
  })

  const getUser = trpc.getUser.useQuery({
    userId: '4269df99-cb99-42c1-9c92-9a7e854e7327',
  })

  const updateUser = trpc.updateUser.useMutation()

  const getDirections = trpc.getDirections.useQuery([
    {
      latitude: 42.64775203224244,
      longitude: 23.40559939582422,
    },
    {
      latitude: 42.64775203224244,
      longitude: 23.40559939582422,
    },
  ])

  return (
    <>
      <div>
        <div className='absolute top-0 left-0 z-[2]'>
          <p>{getActivity.isFetching ? '...' : JSON.stringify(getActivity.data)}</p>
          <button onClick={getActivity.refetch}>GetActivity</button>
          <hr></hr>

          <p>{getUserActivities.isFetching ? '...' : JSON.stringify(getUserActivities.data)}</p>
          <button onClick={getUserActivities.refetch}>GetActivities</button>
          <hr></hr>

          <p>{getDirections.isFetching ? '...' : JSON.stringify(getDirections.data)}</p>
          <button onClick={getDirections.refetch}>GetDirections</button>
          <hr></hr>

          <p>{getRestaurants.isFetching ? '...' : JSON.stringify(getRestaurants.data)}</p>
          <button onClick={getRestaurants.refetch}>Get Restaurants</button>
          <button onClick={clearRestaurants.mutate}>Clear Restaurants</button>
          <hr></hr>

          <p>{getRestaurantDetail.isFetching ? '...' : JSON.stringify(getRestaurantDetail.data)}</p>
          <button onClick={getRestaurantDetail.refetch}>Log Restaurant Detail</button>
          <hr></hr>

          <p>{getUser.isFetching ? '...' : JSON.stringify(getUser.data)}</p>
          <button onClick={getUser.refetch}>Get User</button>
          <button
            onClick={() =>
              updateUser.mutate({
                payload: {
                  name: new Date().toISOString(),
                },
                userId: '4269df99-cb99-42c1-9c92-9a7e854e7327',
              })
            }
          >
            Update User
          </button>
          <hr></hr>
          {/* <p>{hello.isFetching ? '...' : JSON.stringify(hello.data)}</p>
          <p>{postHello.isLoading ? '...' : JSON.stringify(postHello.data)}</p>
          <button onClick={() => postHello.mutate({ title: 'fe' })}>Post Hello</button> */}
          <hr></hr>
          <button onClick={() => useToast('Toast')}>useToast</button>
        </div>
        <MapBox />
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export const getServerSideProps = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return { props: {} }
}

export default PlayGround
