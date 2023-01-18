import { handleRequest, activityTable, Response } from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const activity_id = req.query.activity_id as string

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
