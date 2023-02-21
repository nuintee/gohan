import { GCP_API_KEY } from '@/config/env'
import { PhotosEntity } from '@/features/restaurants/types'

const usePlacePhotos = (photos: PhotosEntity) => {
  const url = new URL('https://maps.googleapis.com/maps/api/place/photo')
  url.searchParams.append('photo_reference', photos.photo_reference)
  url.searchParams.append('key', GCP_API_KEY)
  return { ...photos, url: url.toString() }
}

export default usePlacePhotos
