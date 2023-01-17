import { ResponseResolver, MockedRequest, restContext } from 'msw'

import mapData from '@/data/places/index.json'

const get: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  const onlyOpenNow = mapData.results.filter((map, index) => map.opening_hours?.open_now)
  const randomIndex = Math.floor(Math.random() * onlyOpenNow.length)
  const randomOne = onlyOpenNow[randomIndex]

  return res(ctx.status(200), ctx.json(randomOne))
}

export default { get }
