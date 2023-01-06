import { handleRequest, activityTable } from '@/hooks/API/prisma'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { activity_id } = req.query
  switch (req.method) {
    case 'GET':
      await handleRequest(() => activityTable.get({ id: activity_id }), res)
      break
    case 'PATCH':
      await handleRequest(
        () =>
          activityTable.patch({
            id: activity_id,
            ...req.body,
          }),
        res,
      )
      break
    case 'DELETE':
      handleRequest(() => activityTable.delete({ id: activity_id }), res)
      break
    default:
      res.status(200).json({})
      break
  }
}
