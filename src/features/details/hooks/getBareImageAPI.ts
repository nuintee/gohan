import { BASE_URL, IS_PRODMODE } from '@/config/env'

export function getBareImageAPI(photo_reference: string) {
  if (IS_PRODMODE) {
    const url = new URL(`${BASE_URL}/api/image/${photo_reference}`)

    return url.toString()
  } else {
    const TEXT = photo_reference?.slice(0, 10) || 'DEV'

    return `https://via.placeholder.com/600x400?text=${TEXT}`
  }
}
