import { BASE_URL, FALLBACK_IMAGE, IS_PRODMODE } from '@/config/env'

export function getBareImageAPI(photo_reference: string) {
  if (IS_PRODMODE) {
    const url = new URL(`${BASE_URL}/api/image/${photo_reference}`)

    return url.toString()
  } else {
    return FALLBACK_IMAGE
  }
}
