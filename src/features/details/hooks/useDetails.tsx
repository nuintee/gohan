import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useDetails = ({
  trigger,
  successCallback,
  ...rest
}: Parameters<typeof trpc.getDetails.useQuery>[0] & {
  successCallback?: (data: ReturnType<typeof trpc.getDetails.useQuery>) => void
  trigger?: boolean
}) => {
  return trpc.getDetails.useQuery(rest, {
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error)
      }
    },
    onSuccess: (data) => {
      successCallback && successCallback(data)
    },
  })
}

export default useDetails
