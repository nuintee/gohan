import { ResultsEntity } from '@/features/restaurants/types'

// consts
import { KEY_FEATURES } from '../constants'
import { mapKeyFeatures } from './mapKeyFeatures'

function useKeyFeatures<T extends ResultsEntity>(data: T) {
  const FEATURES = Object.keys(data)
    .filter((v) => KEY_FEATURES.includes(v))
    .map((v) => ({ feature: v, label: mapKeyFeatures(v) }))

  return FEATURES
}

export default useKeyFeatures
