import { trpc } from '@/libs/trpc'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  return trpc.getActivity.useQuery(props)
}

export default useGetActivity
