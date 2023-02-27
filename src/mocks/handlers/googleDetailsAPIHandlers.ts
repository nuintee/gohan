import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from 'msw'

export const googleDetailsAPIHandlers = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  try {
    return res(ctx.status(200), ctx.json({ status: 'OK' }))
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}
