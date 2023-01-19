import { rest } from 'msw'

// Data
import mapData from '@/data/places/index.json'
import routeData from '@/data/route/index.json'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/api/place/', async (req, res, ctx) => {
    const query = req.url.searchParams
    const place_id = query.get('place_id')
    const latitude = query.get('latitude')
    const longitude = query.get('longitude')

    function _findRandomOne() {
      const onlyOpenNow = mapData.results.filter((map, index) => map.opening_hours?.open_now)
      const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
      const responseData = onlyOpenNow[randomIndex]
      return responseData
    }

    const data = _findRandomOne()

    return res(ctx.status(200), ctx.json(data))
  }),

  rest.get('/api/place/:place_id', async (req, res, ctx) => {
    const query = req.url.searchParams
    const place_id = req.params?.place_id

    function _findOneById() {
      const found = mapData.results.find((v) => v.place_id === place_id)
      return found
    }

    const data = _findOneById()

    return res(ctx.status(200), ctx.json(data))
  }),

  rest.get('/api/route', (req, res, ctx) => {
    const place_id = req.url.searchParams.get('place_id')
    if (!place_id) return res(ctx.status(500), ctx.json({}))

    const targetData = place_id ? routeData.find((v, i) => v.place_id === place_id) : routeData[0]
    const data = targetData.routes
    const coordinates = data[0].geometry.coordinates

    return res(
      ctx.status(200),
      ctx.json({
        data,
        coordinates,
      }),
    )
  }),
]
