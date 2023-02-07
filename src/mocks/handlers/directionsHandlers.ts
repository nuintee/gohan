import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from 'msw'

// Schema
import { Schema } from '@/features/directions/schema/coordinates.schema'

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

  const _findByCoords = (coords: string) => {
    const parse = coords.split(',').map((v) => Number(v))
    const found = directions.find((v) => {
      const coordinates = v.routes[0].geometry.coordinates
      const lastCoordinates = coordinates[coordinates.length - 1]
      return JSON.stringify(lastCoordinates) === JSON.stringify(parse)
    })
    console.log(found, parse)
    return found
  }

  try {
    await Schema.parse({
      start,
      end,
      ...(profileType && { profileType }),
    })
    const data = _findByCoords(end)
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
