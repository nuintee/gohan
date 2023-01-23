import places from '@/data/_places.json'

// Schemas
import * as PlacesAPI from '@/features/restaurants/schemas/getNearRestaurants.schema'
import * as DetailsAPI from '@/features/restaurants/schemas/getRestaurantDetails.schema'

export const restaurantPlacesAPIHandler = async (req, res, ctx) => {
  function _findRandomOne() {
    const onlyOpenNow = places.results.filter((map, index) => map.opening_hours?.open_now)
    const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
    const responseData = onlyOpenNow[randomIndex]
    return responseData
  }

  try {
    const query = req.url.searchParams
    const { latitude, longitude } = await PlacesAPI.Schema.parse(query)

    const data = _findRandomOne()

    return res(ctx.status(200), ctx.json(data))
  } catch (error) {
    return res(
      ctx.status(500),
      cts.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}

export const restaurantDetailsAPIHandler = async (req, res, ctx) => {
  function _findOneById(place_id) {
    const found = place_id ? places.results.find((v) => v.place_id === place_id) : places[0]
    return found
  }

  try {
    const { place_id } = await DetailsAPI.Schema.parse(req.params?.place_id)
    const data = _findOneById(place_id)

    return res(ctx.status(200), ctx.json(data))
  } catch (error) {
    return res(
      ctx.status(500),
      cts.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}
