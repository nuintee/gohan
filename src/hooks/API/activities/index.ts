import fs from 'fs'

// Data
import activities from '@/data/activities/index.json'

export const activitiesTable = {
  getAll: () => activities,
  getByUserId: (userId: string) => activities[userId],
  getById: (userId: string, activityId: string) =>
    activitiesTable.getByUserId(userId).find((x) => x.id === activityId),
}
