import { rest } from 'msw'

// handlers
import {
  restaurantDetailsAPIHandler,
  restaurantPlacesAPIHandler,
} from './handlers/restaurantsHandler'

import { directionsAPIHandler } from './handlers/directionsHandlers'
import {
  userActivitiesHandler,
  activityHandler,
  postActivityHandler,
  patchActivityHandler,
  getActivityHandler,
} from './handlers/activitiesHandlers'
import { googlePhotosAPIHandler } from './handlers/googlePhotosAPIHandlers'

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
  // rest.get(`${BASE_PATH}/restaurants`, restaurantPlacesAPIHandler),
  rest.get(`${BASE_PATH}/restaurants/:place_id`, restaurantDetailsAPIHandler),
  rest.get(`${BASE_PATH}/directions`, directionsAPIHandler),
  rest.get(`${BASE_PATH}/details`, restaurantDetailsAPIHandler),
  rest.all(`${BASE_PATH}/activities/user/:user_id`, userActivitiesHandler),
  // rest.post(`${BASE_PATH}/activities`, postActivityHandler),
  rest.patch(`${BASE_PATH}/activity/:activity_id`, patchActivityHandler),
  // rest.get(`${BASE_PATH}/activity/:activity_id`, getActivityHandler),
]
