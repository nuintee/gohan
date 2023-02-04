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

const BASE_PATH = '/api/v1'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get(`${BASE_PATH}/health`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        mock: true,
      }),
    )
  }),

  rest.get(`${BASE_PATH}/restaurants`, restaurantPlacesAPIHandler),
  rest.get(`${BASE_PATH}/restaurants/:place_id`, restaurantDetailsAPIHandler),
  rest.get(`${BASE_PATH}/directions`, directionsAPIHandler),
  rest.get(`${BASE_PATH}/details`, restaurantDetailsAPIHandler),
  rest.all(`${BASE_PATH}/activities/user/:user_id`, userActivitiesHandler),
  // rest.post(`${BASE_PATH}/activities`, postActivityHandler),
  // rest.patch(`${BASE_PATH}/activity/:activity_id`, patchActivityHandler),
  // rest.get(`${BASE_PATH}/activity/:activity_id`, getActivityHandler),
]
