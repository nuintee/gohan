import places from '@/data/_places.json'

// Schemas
import * as PlacesAPI from '@/features/restaurants/schemas/getNearRestaurants.schema'

export const restaurantPlacesAPIHandler = async (req, res, ctx) => {
  const query = req.url.searchParams
  const { latitude, longitude } = await PlacesAPI.Schema.parse(query)

  function _findRandomOne() {
    const onlyOpenNow = places.results.filter((map, index) => map.opening_hours?.open_now)
    const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
    const responseData = onlyOpenNow[randomIndex]
    return responseData
  }

  const data = _findRandomOne()

  return res(ctx.status(200), ctx.json(data))
}

export const restaurantDetailsAPIHandler = async (req, res, ctx) => {
  const place_id = req.params?.place_id

  function _findOneById() {
    const found = place_id ? places.results.find((v) => v.place_id === place_id) : places[0]
    return found
  }

  const data = _findOneById()

  return res(ctx.status(200), ctx.json(data))
}
