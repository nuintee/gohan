import { FALLBACK_IMAGE } from '@/config/env'
import { ResultsEntity } from '@/features/restaurants/types'
import { getBareImageAPI } from './getBareImageAPI'

const usePlacePhotos = (photos: ResultsEntity['photos']) => {
  if (!photos)
    return {
      url: FALLBACK_IMAGE,
      width: 400,
      height: 400,
      html_attributions: [],
    }

  const url = getBareImageAPI(photos[0].photo_reference)

  return { ...photos[0], url: url.toString() }
}

export default usePlacePhotos
