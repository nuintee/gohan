import { ResultsEntity } from '@/features/restaurants/types'

// consts
import { KEY_FEATURES } from '../constants'
import { mapKeyFeatures } from './mapKeyFeatures'

type PickedKeys = keyof Pick<ResultsEntity, typeof KEY_FEATURES[number]>

function useKeyFeatures<T extends ResultsEntity | undefined>(data: T) {
  if (!data) return []

  const FEATURES = Object.keys(data)
    .filter((v) => KEY_FEATURES.includes(v as PickedKeys))
    .map((v) => ({ feature: v, label: mapKeyFeatures(v as PickedKeys) }))

  return FEATURES
}

export default useKeyFeatures
