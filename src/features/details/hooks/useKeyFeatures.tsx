import useGetActivity from '@/features/activities/hooks/useGetActivity'

// consts
import { KEY_FEATURES } from '../constants'

function useKeyFeatures<T extends ReturnType<typeof useGetActivity>['data']>(data: T) {
  const FEATURES = Object.keys(data)
    .filter((v) => KEY_FEATURES.includes(v))
    .map((v) => ({ feature: v }))

  return FEATURES
}

export default useKeyFeatures
