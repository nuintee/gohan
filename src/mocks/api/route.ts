import { ResponseResolver, MockedRequest, restContext } from 'msw'

import routeData from '@/data/route/index.json'

const get: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  const { place_id } = req.params
  const foundRoute = routeData.find((v) => v.place_id === place_id)

  if (!foundRoute) return res(ctx.status(500), ctx.json([]))

  res(ctx.status(200), ctx.json(foundRoute?.routes))
}

export default { get }
