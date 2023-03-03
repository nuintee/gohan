import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useDetails = ({
  successCallback,
  ...rest
}: Parameters<typeof trpc.getDetails.useQuery>[0] & {
  successCallback?: <T extends {}>(_data: T) => void
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
