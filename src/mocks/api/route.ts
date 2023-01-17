import { ResponseResolver, MockedRequest, restContext } from 'msw'

const get: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Alice',
      },
      {
        id: 3,
        name: 'Bob',
      },
    ]),
  )
}

export default { get }
