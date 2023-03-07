import { BASE_URL, GCP_API_KEY, IS_PRODMODE } from '@/config/env'

function _generatePastelColor() {
  let R = Math.floor(Math.random() * 127 + 127)
  let G = Math.floor(Math.random() * 127 + 127)
  let B = Math.floor(Math.random() * 127 + 127)

  let rgb = (R << 16) + (G << 8) + B
  return `${rgb.toString(16)}`
}

export function getBareImageAPI(photo_reference: string) {
  if (IS_PRODMODE) {
    const url = new URL(`${BASE_URL}/api/image/${photo_reference}`)

    return url.toString()
  } else {
    return `https://via.placeholder.com/600x400/${_generatePastelColor()}/FFF.png?text=NO_IMAGE`
  }
}
