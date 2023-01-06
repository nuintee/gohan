import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handle_request, userTable } from '@/hooks/API/prisma'

// GET | POST
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      await handle_request(() => userTable.add(req.body), res)
      break
    case 'GET':
      await handle_request(() => prisma.user.findMany(), res)
      break
    default:
      break
  }
}
