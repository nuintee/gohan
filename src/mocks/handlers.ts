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
    const place_id = req.url.searchParams.get('id')
    const data = place_id
      ? routeData.find((v, i) => v.place_id === place_id)
      : routeData[Math.floor(Math.random() * routeData.length)]
    const coordinates = data?.routes[0].geometry.coordinates

    if (!data) return res(ctx.status(500), ctx.json({}))

    return res(ctx.status(200), ctx.json({ data, coordinates }))
  }),
]
