import useGetActivity from '@/features/activities/hooks/useGetActivity'

// consts
import { KEY_FEATURES } from '../constants'
import { mapKeyFeatures } from './mapKeyFeatures'

function useKeyFeatures<T extends ReturnType<typeof useGetActivity>['data']>(data: T) {
  const FEATURES = Object.keys(data)
    .filter((v) => KEY_FEATURES.includes(v))
    .map((v) => ({ feature: v, label: mapKeyFeatures(v) }))

  return FEATURES
}

export default useKeyFeatures
