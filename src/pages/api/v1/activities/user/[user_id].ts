import type { NextApiRequest, NextApiResponse } from 'next'

import { activityTable } from '@/features/activities/prisma/activityTable'
import axios from 'axios'
import { getRestaurantDetails } from '@/features/restaurants/controllers/getRestaurantDetails'
import { Activity } from '@prisma/client'

// GET | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, details, ...queries } = req.query as { user_id: string; details: string }

  try {
    switch (req.method) {
      case 'GET':
        const fetchedUserActivities = await activityTable.getUserAll({ user_id, ...queries })
        let detailsUserActivities: Activity[] = []
        // Get Details on Query
        if (details) {
          detailsUserActivities = await Promise.all(
            fetchedUserActivities.map(async (activity) => {
              const data = await getRestaurantDetails({ place_id: activity.place_id })
              return data.result
            }),
          )
        }

        const mergedActivities = fetchedUserActivities.map((activity, index) => ({
          ...activity,
          ...(detailsUserActivities.length > 0 && { ...detailsUserActivities[index] }),
        }))

        res.status(200).json(mergedActivities)
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
    console.error(error)
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
