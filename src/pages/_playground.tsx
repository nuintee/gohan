import { GohanButton, ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import { trpc } from '@/libs/trpc'

// ENV
import useToast from '@/libs/react-toastify'
import { UseTRPCMutationResult, UseTRPCQueryResult } from '@trpc/react-query/shared'

type Props = {
  apiResult: UseTRPCQueryResult<any, any> | UseTRPCMutationResult<any, any, any, any>
  write?: boolean
  mutationPayload?: Object
}

const buttonClass =
  'p-2 bg-gh-dark text-white rounded-md text-sm hover:bg-opacity-80 active:bg-opacity-80 active:scale-90 font-mono'

const Details = (props: Props) => {
  const { apiResult, mutationPayload } = props

  const isQuery = apiResult.hasOwnProperty('refetch')
  const isMutation = apiResult.hasOwnProperty('mutate')

  const handleTry = async () => {
    if (isQuery) {
      const refetched = await apiResult.refetch()
      console.log(refetched)
    } else if (isMutation) {
      apiResult.mutateAsync(mutationPayload)
      console.log(apiResult)
    }
  }

  const loading = () => {
    if (isMutation) {
      const l = Boolean(apiResult.isLoading || apiResult.isFetching | apiResult.isRefetching)
      return l
    } else {
      return apiResult.isLoading
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
    <details className='bg-white min-w-[10rem] p-2 cursor-pointer group'>
      <summary className='text-gray-400 group-open:text-black font-mono'>
        {props.apiResult.trpc.path}
      </summary>
      <div className='flex gap-2 pt-2 items-center justify-between'>
        <span className={`p-2 ${statusColor(apiResult.status)} rounded-md text-white font-mono`}>
          {apiResult.status}
        </span>
        <button onClick={handleTry} className={buttonClass}>
          {loading() ? '...' : 'TRY'}
        </button>
      </div>
    </details>
  )
}

const DetailsRenderer = ({ children }) => {
  return <div className='flex flex-col divide-y'>{children}</div>
}

const DetailsGroup = ({ children, label }) => {
  return (
    <div className='bg-white p-2'>
      <h1 className='font-semibold font-mono'>{label}</h1>
      {children}
    </div>
  )
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
          <DetailsRenderer>
            <DetailsGroup label={'User'}>
              <Details apiResult={getUser} />
              <Details
                apiResult={updateUser}
                mutationPayload={{
                  userId: '4269df99-cb99-42c1-9c92-9a7e854e7327',
                  payload: {
                    name: new Date().toISOString(),
                  },
                }}
              />
            </DetailsGroup>
            <DetailsGroup label={'Restaurants'}>
              <Details apiResult={getRestaurantDetail} />
              <Details apiResult={getRestaurants} />
            </DetailsGroup>
            <DetailsGroup label={'Activities'}>
              <Details apiResult={getActivity} />
              <Details apiResult={getUserActivities} />
            </DetailsGroup>
            <DetailsGroup label={'Directions'}>
              <Details apiResult={getDirections} />
            </DetailsGroup>
            <DetailsGroup label={'Toasts'}>
              <div className='flex flex-col gap-2'>
                <button className={buttonClass} onClick={() => useToast('NORMAL')}>
                  NORMAL
                </button>
                <button className={buttonClass} onClick={() => useToast.info('INFO')}>
                  INFO
                </button>
                <button className={buttonClass} onClick={() => useToast.error('ERROR')}>
                  ERROR
                </button>
                <button className={buttonClass} onClick={() => useToast.success('NORMAL')}>
                  SUCCESS
                </button>
              </div>
            </DetailsGroup>
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
