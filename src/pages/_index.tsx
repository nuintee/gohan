import { useSendReports } from '@/features/report/hooks/useSendReports'

const Experiment = () => {
  const sendReport = useSendReports()

  return (
    <div>
      <h1>Report</h1>
      <p>{JSON.stringify(sendReport.data)}</p>
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
