import { useGeoLocation } from '@/hooks/context'

// Config
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const useGetRoute = async ({ profileType, start, end, onSuccess, onError }) => {
  try {
    const base_coordinates = encodeURIComponent(`${start};${end}`)
    const profile = `mapbox/${profileType || 'walking'}`
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/${profile}/${base_coordinates}?alternatives=true&geometries=geojson&language=en&overview=simplified&access_token=${mapboxAccessToken}`,
    )
    const json = await query.json()
    const routes = json?.routes
    const waypoints = json?.waypoints
    const coordinates = routes?.map((route) => route.geometry.coordinates)
    const endpoint = waypoints.map((waypoint) => waypoint.location)
    onSuccess({ coordinates, endpoint })
  } catch (error) {
    console.error(error)
    onError(error)
  }
}

export default useGetRoute
