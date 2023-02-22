import { colors } from '@/config/colors'
import { GCP_API_KEY } from '@/config/env'
import { PhotosEntity, ResultsEntity } from '@/features/restaurants/types'

function _generatePastelColor() {
  let R = Math.floor(Math.random() * 127 + 127)
  let G = Math.floor(Math.random() * 127 + 127)
  let B = Math.floor(Math.random() * 127 + 127)

  let rgb = (R << 16) + (G << 8) + B
  return `${rgb.toString(16)}`
}

const usePlacePhotos = (photos: ResultsEntity['photos']) => {
  const RANDOM_COLOR = _generatePastelColor()

  if (!photos)
    return {
      url: `https://via.placeholder.com/600x400/${RANDOM_COLOR}/FFF.png?text=NO_IMAGE`,
      width: 400,
      height: 400,
      html_attributions: [],
    }

  const url = new URL('https://maps.googleapis.com/maps/api/place/photo')
  url.searchParams.append('photo_reference', photos[0]?.photo_reference)
  url.searchParams.append('key', GCP_API_KEY)
  url.searchParams.append('maxwidth', '400')

  return { ...photos[0], url: url.toString() }
}

export default usePlacePhotos
