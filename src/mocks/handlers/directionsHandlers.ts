import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from 'msw'

import { z } from 'zod'

// Schema
import { Schema } from '@/features/directions/schema/getDirections.schema'

// data
import directions from '@/data/_directions.json'

export const directionsAPIHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  //   const { profileType, start, end } = req.query
  const place_id = req.url.searchParams.get('place_id')
  if (!place_id) return res(ctx.status(500), ctx.json({})) // Only in mock server

  const targetData = place_id ? directions.find((v, i) => v.place_id === place_id) : directions[0]
  const data = targetData.routes
  const coordinates = data[0].geometry.coordinates

  try {
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
