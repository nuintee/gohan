import type { NextApiRequest, NextApiResponse } from 'next'

import { activityTable } from '@/features/activities/prisma/activityTable'
import axios from 'axios'
import { BASE_URL } from '@/config/env'
import { DetailsAPI } from '@/features/restaurants/types'
import { getRestaurantDetails } from '@/features/restaurants/controllers/getRestaurantDetails'

// GET | PATCH | DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const activity_id = req.query.activity_id as string
  const details = req.query?.details as string
  const onlyNeeded = req.query?.onlyNeeded as string

  try {
    switch (req.method) {
      case 'GET':
        const fetchedActivity = await activityTable.get({ id: activity_id })
        let detailedActivity = {}

        if (details) {
          const data = await getRestaurantDetails({
            place_id: fetchedActivity.place_id,
            onlyNeeded: onlyNeeded !== 'false',
          })
          detailedActivity = data.result || {}
        }

        res.status(200).json({ ...fetchedActivity, ...detailedActivity })
        break
      case 'PATCH':
        const updatedActivity = await activityTable.patch({
          id: activity_id,
          ...req.body,
        })
        res.status(200).json(updatedActivity)
        break
      case 'DELETE':
        const deletedActivity = await activityTable.delete({ id: activity_id })
        res.status(200).json(deletedActivity)
        break
      default:
        res.status(405).json({ message: 'Invalid Method', code: 405, method: req.method })
        break
    }
  } catch (error) {
    res.status(500).json({ message: JSON.parse(error?.message), code: 500 })
  }
}
