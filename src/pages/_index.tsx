import { useSendReports } from '@/features/report/hooks/useSendReports'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'

const Experiment = () => {
  const sendReport = useSendReports()

  const getRestaurants = useRestaurants({ trigger: true, latitude: 90, longitude: 89 })

  return (
    <div>
      <h1>Report</h1>
      <p>{JSON.stringify(sendReport.data)}</p>
      <p>{JSON.stringify(getRestaurants.data)}</p>
      <button onClick={() => getRestaurants.refetch()}>REFETCH</button>
      <button
        onClick={() =>
          sendReport.mutate({
            request_type: 'REVALIDATE',
            body: 'PLACE_ID',
          })
        }
      >
        Send
      </button>
    </div>
  )
}

export default Experiment
