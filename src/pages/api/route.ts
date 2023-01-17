// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import places from '@/data/places/index.json'
type Data = {
  name: string
}

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const results = []

  const start = {
    latitude: 42.647803615748145,
    longitude: 23.405578430147724,
  }

  function _formatCoords(coords: Coords) {
    const { latitude, longitude } = coords
    return `${longitude},${latitude}`
  }

  // for await (const place of places.results) {
  //   const end = { latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }
  //   const base_coordinates = encodeURIComponent(`${_formatCoords(start)};${_formatCoords(end)}`)
  //   const profile = `mapbox/walking`
  //   const baseURL = `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxAccessToken}`

  //   try {
  //     const query = await fetch(baseURL)
  //     const data = await query.json()
  //     results.push({
  //       place_id: place.place_id,
  //       routes: data?.routes,
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  res.json(results)
}
