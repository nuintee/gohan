import { Coords } from '@/types/GeoLocation/index.types'

// Creds
const gcpKey = process.env.NEXT_PUBLIC_GCP_API_KEY

const usePlaces = (coords: Coords) => {
  const is_devmode = process.env.NODE_ENV === 'development'

  const get = async () => {
    try {
      const url = is_devmode
        ? `/api/place?location=${coords.lat},${coords.lng}&radius=500&opennow=true`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=500&types=food&opennow=true&key=${gcpKey}`
      const query = await fetch(url)
      const json = await query.json()
      return json
    } catch (error) {
      console.error(error)
    }
  }

  return { get }
}

export default usePlaces
