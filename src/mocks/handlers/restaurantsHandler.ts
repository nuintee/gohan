import places from '@/data/_places.json'

// Schemas
import * as PlacesAPI from '@/features/restaurants/schemas/getNearRestaurants.schema'
import * as DetailsAPI from '@/features/restaurants/schemas/getRestaurantDetails.schema'
import { DefaultBodyType, ResponseComposition, RestRequest, RestContext, PathParams } from 'msw'

export const restaurantPlacesAPIHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  function _findRandomOne() {
    const onlyOpenNow = places.results.filter((map, index) => map.opening_hours?.open_now)
    const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
    const responseData = onlyOpenNow[randomIndex]
    return responseData || places.results[0]
  }

  try {
    const { latitude, longitude } = await PlacesAPI.Schema.parse({
      latitude: req?.url?.searchParams?.get('latitude'),
      longitude: req?.url?.searchParams?.get('longitude'),
    })

    const data = _findRandomOne()

    return res(ctx.status(200), ctx.json(data))
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}

export const restaurantDetailsAPIHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  function _findOneById(place_id: string) {
    const found = place_id ? places.results.find((v) => v.place_id === place_id) : places[0]
    return found
  }

  try {
    const { place_id } = await DetailsAPI.Schema.parse({ place_id: req.params?.place_id })
    const data = _findOneById(place_id)

    return res(ctx.status(200), ctx.json(data))
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}
