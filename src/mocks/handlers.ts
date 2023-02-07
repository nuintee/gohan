import { rest } from 'msw'

import { googlePhotosAPIHandler } from './handlers/googlePhotosAPIHandlers'
import { googleDetailsAPIHandlers } from './handlers/googleDetailsAPIHandlers'
import { googlePlacesHandlers } from './handlers/googlePlacesHandlers'

const BASE_PATH = '/api/trpc'

export const handlers = [
  rest.get(`${BASE_PATH}/health`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        mock: true,
      }),
    )
  }),

  rest.get(`https://maps.googleapis.com/maps/api/place/photo`, googlePhotosAPIHandler),
  rest.get(`https://maps.googleapis.com/maps/api/place/details/json`, googleDetailsAPIHandlers),
  rest.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, googlePlacesHandlers),
]
