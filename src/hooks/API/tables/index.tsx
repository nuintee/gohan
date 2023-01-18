import { activityTable } from '@/utils/prisma'
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

  const addActivity = async (props?: Parameters<typeof activityTable.add>[0]) => {
    try {
      const query = await fetch('/api/v1/activities', {
        method: 'POST',
        body: JSON.stringify(props),
      })
      const response: Activity = await query.json()
      return response
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  return { getAllActivities, addActivity }
}

export default useTables
