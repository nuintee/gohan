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

  rest.get('/api/place', (req, res, ctx) => {
    const onlyOpenNow = mapData.results.filter((map, index) => map.opening_hours?.open_now)
    const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
    const randomOne = onlyOpenNow[randomIndex]

    return res(ctx.status(200), ctx.json(randomOne))
  }),

  rest.get('/api/route', (req, res, ctx) => {
    const place_id = req.url.searchParams.get('place_id')
    // const data = place_id ? routeData.find((v) => v.place_id === place_id) : routeData[0]
    if (!place_id) return res(ctx.status(500), ctx.json({}))

    const targetData = place_id ? routeData.find((v, i) => i === 3) : routeData[0]
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
