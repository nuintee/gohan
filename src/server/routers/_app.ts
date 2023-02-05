import { z } from 'zod'
import { procedure, router } from '../trpc'
export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      }
    }),
  postHello: procedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return input
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
