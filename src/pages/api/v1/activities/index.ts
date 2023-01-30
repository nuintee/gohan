import type { NextApiRequest, NextApiResponse } from 'next'

import { activityTable } from '@/features/activities/prisma/activityTable'

// GET | POST | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    switch (req.method) {
      case 'GET':
        const fetchedAllActivities = await activityTable.getAll(req.query)
        res.status(200).json(fetchedAllActivities)
      case 'POST':
        const addedActivity = await activityTable.add(req.body)
        res.status(200).json(addedActivity)
        break
      default:
        res.status(405).json({ message: 'Invalid Method', code: 405, method: req.method })
        break
    }
  } catch (error) {
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
