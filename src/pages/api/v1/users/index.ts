import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleRequest, userTable, Response } from '@/hooks/API/prisma'

// GET | POST
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'POST':
      await handleRequest(() => userTable.add(req.body), res)
      break
    case 'GET':
      await handleRequest(() => userTable.getAll(req.query), res)
      break
    default:
      break
  }
}
