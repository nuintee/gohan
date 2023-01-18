import { activityTable } from '@/utils/prisma'
import { Activity } from '@prisma/client'

const useTables = () => {
  const getAllActivities = async (props: Parameters<typeof activityTable.getAll>[0]) => {
    const query = await fetch('/api/v1/activities')
    const response: Activity[] = await query.json()
    return response
  }

  return { getAllActivities }
}

export default useTables
