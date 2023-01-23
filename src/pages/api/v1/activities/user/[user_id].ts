import type { NextApiRequest, NextApiResponse } from 'next'

import { activityTable } from '@/features/activities/prisma/activityTable'

// GET | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const user_id = req.query.user_id as string

  try {
    switch (req.method) {
      case 'GET':
        const fetchedUserActivities = await activityTable.getUserAll({ user_id, ...req.query })
        res.status(200).json(fetchedUserActivities)
        break
      case 'DELETE':
        const deletedUserActivities = await activityTable.deleteUserAll({ user_id })
        res.status(200).json(deletedUserActivities)
        break
      default:
        res.status(405).json({ message: 'Invalid Method', code: 405, method: req.method })
        break
    }
  } catch (error) {
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
