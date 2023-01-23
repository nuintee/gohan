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
  const profileType = req?.url.searchParams.get('profileType')
  const start = req?.url.searchParams.get('start')
  const end = req?.url.searchParams.get('end')

  const _place_id = req.headers.get('x-place-id')

  const _findById = (place_id: string) => {
    const randomData = directions[Math.floor(Math.random() * directions.length)]

    const found = directions.find((direction) => direction.place_id === place_id)

    if (!found) return randomData

    return found
  }

  try {
    await Schema.parse({
      start,
      end,
      ...(profileType && { profileType }),
    })
    const data = _findById(_place_id)
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
