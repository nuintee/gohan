import { rest } from 'msw'

import { googlePhotosAPIHandler } from './handlers/googlePhotosAPIHandlers'
import { googleDetailsAPIHandlers } from './handlers/googleDetailsAPIHandlers'
import { googlePlacesHandlers } from './handlers/googlePlacesHandlers'
import { BASE_URL } from '@/config/env'

export const handlers = [
  rest.get(`https://maps.googleapis.com/maps/api/place/photo`, googlePhotosAPIHandler),
  rest.get(`https://maps.googleapis.com/maps/api/place/details/json`, googleDetailsAPIHandlers),
  rest.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, googlePlacesHandlers),
  rest.get(`${BASE_URL}/api/trpc/getActivity`, (req, res, ctx) => {
    const input = req.url.searchParams.get('input')
    const decoded = decodeURI(input)
    const parsed = JSON.parse(decoded)
    console.log(parsed)
    return res(ctx.json({}))
  }),
]
