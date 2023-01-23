import { rest } from 'msw'

const healthResolver = rest.get('/api/v1/health', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ status: 'ok', mock: true }))
})

export default healthResolver
