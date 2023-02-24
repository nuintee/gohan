import useGetActivity from '@/features/activities/hooks/useGetActivity'
import { ActivityResolved } from '@/features/activities/types'

function useKeyFeatures<T extends ReturnType<typeof useGetActivity>['data']>(data: T) {
  return []
}

export default useKeyFeatures
