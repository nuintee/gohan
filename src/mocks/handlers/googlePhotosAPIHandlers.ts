import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from 'msw'

export const googlePhotosAPIHandler = async (
  _req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  try {
    const image = await fetch('https://source.unsplash.com/random').then((res) => res.arrayBuffer())
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(image),
    )
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
