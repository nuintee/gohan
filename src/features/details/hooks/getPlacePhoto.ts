import { FALLBACK_IMAGE } from '@/config/env'
import { PhotosEntity } from '@/features/restaurants/types'
import { ResolvedPlacePhoto } from '../types/index.types'
import { getBareImageAPI } from './getBareImageAPI'

export function getPlacePhoto(photo?: PhotosEntity): ResolvedPlacePhoto {
  if (!photo)
    return {
      url: FALLBACK_IMAGE,
      photo_reference: '',
      width: 400,
      height: 400,
      html_attributions: [''],
    }

  const url = getBareImageAPI(photo.photo_reference)

  return { ...photo, url: url.toString() }
}
