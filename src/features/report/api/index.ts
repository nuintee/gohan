import { procedure } from '@/server/trpc'
import { z } from 'zod'

import { ReportType } from '@prisma/client'

export const addReport = procedure
  .input(
    z.object({
      body: z.string(),
      request_type: z.nativeEnum(ReportType),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    await ctx.prisma.report.create({
      data: {
        ...input,
        userId: ctx.session?.user.id,
      },
    })

    return {
      message: 'レポートを送信しました。',
    }
  })
