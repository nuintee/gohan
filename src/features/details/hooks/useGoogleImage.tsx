import { GCP_API_KEY } from '@/config/env'
import { PhotosEntity, ResultsEntity } from '@/features/restaurants/types'

const usePlacePhotos = (photos: ResultsEntity['photos']) => {
  if (!photos)
    return {
      url: 'https://via.placeholder.com/600x400/FFF/png?text',
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
