import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const Experiment = () => {
  const sendReport = trpc.addReport.useMutation({
    onSuccess: () => {
      useToast.success('レポートを送信しました。')
    },
    onError: (error) => {
      console.error(error)
      useToast.error(error.message)
    },
  })

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
