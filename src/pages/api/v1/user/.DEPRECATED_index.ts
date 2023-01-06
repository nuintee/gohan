import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]'

import { handle_request, userTable } from '@/hooks/API/prisma'

// GET | PATCH
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  switch (req.method) {
    case 'GET':
      await handle_request(
        () =>
          prisma.user.findUnique({
            where: {
              id: session?.user?.id,
            },
          }),
        res,
      )
      break
    case 'PATCH':
      await handle_request(
        () =>
          prisma.user.update({
            where: {
              id: session?.user?.id,
            },
            data: {
              email: req.body?.email,
              username: req.body?.username,
            },
          }),
        res,
      )
      break
  }
}
