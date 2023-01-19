import { activityTable } from '@/hooks/API/prisma'
import { Activity } from '@prisma/client'

const useTables = () => {
  const getAllActivities = async (props?: Parameters<typeof activityTable.getAll>[0]) => {
    try {
      const query = await fetch('/api/v1/activities')
      const response: Activity[] = await query.json()
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const getUserAllActivities = async (props?: Parameters<typeof activityTable.getUserAll>[0]) => {
    try {
      const query = await fetch(`/api/v1/activities/user/${props?.user_id}`)
      const response: Activity[] = await query.json()
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const addActivity = async (props?: Parameters<typeof activityTable.add>[0]) => {
    try {
      const query = await fetch('/api/v1/activities', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          user_id: props?.user_id,
          place_id: props?.place_id,
        }),
      })
      const response: Activity = await query.json()
      return response
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  return { getAllActivities, addActivity, getUserAllActivities }
}

export default useTables
