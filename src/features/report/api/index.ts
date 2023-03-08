import { procedure } from '@/server/trpc'
import { TRPCClientError } from '@trpc/client'
import { z } from 'zod'

import { ReportType } from '@prisma/client'
import { randomUUID } from 'crypto'

export const addReport = procedure
  .input(
    z.object({
      body: z.string(),
      request_type: z.nativeEnum(ReportType),
    }),
  )
  .query(async ({ input, ctx }) => {
    await ctx.prisma.report.create({
      data: {
        ...input,
      },
    })

    return {
      message: 'レポートを送信しました。',
    }
  })
