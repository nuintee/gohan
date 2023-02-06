import { GohanButton, ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import { trpc } from '@/libs/trpc'

// ENV
import useToast from '@/libs/react-toastify'
import useGetRestaurants from '@/features/restaurants/hooks/useRestaurants/useGetRestaurants'
import useClearRestaurant from '@/features/restaurants/hooks/useRestaurants/useClearRestaurant'
import useRestaurantDetails from '@/features/restaurants/hooks/useRestaurantDetails'
import { UseTRPCMutationResult, UseTRPCQueryResult } from '@trpc/react-query/shared'

type Props = {
  apiResult: UseTRPCQueryResult<any, any> | UseTRPCMutationResult<any, any, any, any>
  type: 'q' | 'm' // query , mutation
  write?: boolean
  mutationPayload?: Object
}

const Details = (props: Props) => {
  const { apiResult, type, write, mutationPayload } = props

  const handleTry = () => {
    if (type === 'm') {
      apiResult.refetch()
    } else if (type === 'q') {
      apiResult.mutate(mutationPayload)
    }
  }

  const loader = () => {
    if (type === 'm') {
      const l = Boolean(apiResult.isLoading || apiResult.isFetching | apiResult.isRefetching)
      return l && 'loading...'
    } else {
      return apiResult.isLoading && 'loading...'
    }
  }

  const statusColor = (status: 'error' | 'success' | 'loading' | 'idle') => {
    switch (status) {
      case 'error':
        return 'bg-red-400'
      case 'success':
        return 'bg-green-400'
      case 'loading':
        return 'bg-yello-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <details className='bg-white min-w-[10rem] p-2 cursor-pointer'>
      <summary>{props.apiResult.trpc.path}</summary>
      <div className='flex gap-2 pt-2 items-center justify-between'>
        <span className={`p-2 ${statusColor(apiResult.status)} rounded-md text-white`}>
          {apiResult.status}
        </span>
        <span>{loader()}</span>
        <button
          onClick={handleTry}
          className='p-2 bg-gh-dark text-white rounded-md text-sm hover:bg-opacity-80 active:bg-opacity-80'
        >
          TRY
        </button>
      </div>
    </details>
  )
}

const DetailsRenderer = ({ children }) => {
  return <div className='flex flex-col divide-y'>{children}</div>
}

const PlayGround = () => {
  // Restaurants [OK]
  const getRestaurants = trpc.getRestaurant.useQuery({
    latitude: 42.64775203224244,
    longitude: 23.40559939582422,
  })

  const getRestaurantDetail = trpc.getRestaurantDetails.useQuery({
    place_id: 'ChIJzdIWCP2GqkAR4wCobfmZAvo',
  })

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
          {/* <p>{getActivity.isFetching ? '...' : JSON.stringify(getActivity.data)}</p>
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
          <hr></hr> */}
          <button onClick={() => useToast('Toast')}>useToast</button>
          <DetailsRenderer>
            <Details apiResult={getActivity} type='m' />
            <Details
              apiResult={updateUser}
              type='q'
              mutationPayload={{
                userId: '4269df99-cb99-42c1-9c92-9a7e854e7327',
                payload: {
                  name: new Date().toISOString(),
                },
              }}
            />
          </DetailsRenderer>
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
