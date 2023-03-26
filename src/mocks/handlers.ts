import { rest } from 'msw'

import { googlePhotosAPIHandler } from './handlers/googlePhotosAPIHandlers'
import { googleDetailsAPIHandlers } from './handlers/googleDetailsAPIHandlers'
import { googlePlacesHandlers } from './handlers/googlePlacesHandlers'

export const handlers = [
  rest.get(`https://maps.googleapis.com/maps/api/place/photo`, googlePhotosAPIHandler),
  rest.get(`http://localhost:3000/api/image`, googlePhotosAPIHandler),
  rest.get(`https://maps.googleapis.com/maps/api/place/details/json`, googleDetailsAPIHandlers),
  rest.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, googlePlacesHandlers),
  rest.get(`https://jsonplaceholder.typicode.com/todos/1`, googlePlacesHandlers),
]
