import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw'

export const userActivitiesHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  //   function _findOneById(place_id: string) {
  //     const found = place_id ? places.results.find((v) => v.place_id === place_id) : places[0]
  //     return found
  //   }

  try {
    // const { place_id } = await DetailsAPI.Schema.parse({ place_id: req.params?.place_id })
    // const data = _findOneById(place_id)

    return res(ctx.status(200), ctx.json({}))
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

export const activityHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  //   function _findOneById(place_id: string) {
  //     const found = place_id ? places.results.find((v) => v.place_id === place_id) : places[0]
  //     return found
  //   }

  try {
    // const { place_id } = await DetailsAPI.Schema.parse({ place_id: req.params?.place_id })
    // const data = _findOneById(place_id)

    return res(ctx.status(200), ctx.json({}))
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
