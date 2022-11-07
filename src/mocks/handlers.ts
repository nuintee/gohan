import { rest } from 'msw'

// Data
import mapData from '@/hooks/API/Places/res/index.json'

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
]
