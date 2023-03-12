import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from 'msw'

export const googlePlacesHandlers = async (
  _req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  try {
    return res(ctx.status(200), ctx.json({ result: 2 }))
  } catch (error) {
    if (error instanceof Error) {
      return res(
        ctx.status(500),
        ctx.json({
          message: error.message,
          code: 500,
        }),
      )
    }
  }
}
