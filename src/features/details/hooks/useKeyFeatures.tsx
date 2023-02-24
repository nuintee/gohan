import useGetActivity from '@/features/activities/hooks/useGetActivity'
import { ActivityResolved } from '@/features/activities/types'

// consts
import { KEY_FEATURES } from '../constants/keyFeatures'

function useKeyFeatures<T extends ReturnType<typeof useGetActivity>['data']>(data: T) {
  const FEATURES = Object.keys(data).filter((v) => KEY_FEATURES.includes(v))

  console.log(FEATURES)

  return []
}

export default useKeyFeatures
