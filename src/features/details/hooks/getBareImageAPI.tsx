import { GCP_API_KEY, IS_PRODMODE } from '@/config/env'

function _generatePastelColor() {
  let R = Math.floor(Math.random() * 127 + 127)
  let G = Math.floor(Math.random() * 127 + 127)
  let B = Math.floor(Math.random() * 127 + 127)

  let rgb = (R << 16) + (G << 8) + B
  return `${rgb.toString(16)}`
}

export function getBareImageAPI(photo_reference: string) {
  if (IS_PRODMODE) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/photo')
    url.searchParams.append('photo_reference', photo_reference)
    url.searchParams.append('key', GCP_API_KEY)
    url.searchParams.append('maxwidth', '400')

    return url.toString()
  } else {
    return `https://via.placeholder.com/600x400/${_generatePastelColor()}/FFF.png?text=NO_IMAGE`
  }
}
