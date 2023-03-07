import { GCP_API_KEY } from '@/config/env'
import { ResultsEntity } from '@/features/restaurants/types'
import { getBareImageAPI } from './getBareImageAPI'

function _generatePastelColor() {
  let R = Math.floor(Math.random() * 127 + 127)
  let G = Math.floor(Math.random() * 127 + 127)
  let B = Math.floor(Math.random() * 127 + 127)

  let rgb = (R << 16) + (G << 8) + B
  return `${rgb.toString(16)}`
}

const usePlacePhotos = (photos: ResultsEntity['photos']) => {
  if (!photos)
    return {
      url: `https://via.placeholder.com/600x400/${_generatePastelColor()}/FFF.png?text=NO_IMAGE`,
      width: 400,
      height: 400,
      html_attributions: [],
    }

  const url = getBareImageAPI(photos[0].photo_reference)

  return { ...photos[0], url: url.toString() }
}

export default usePlacePhotos
