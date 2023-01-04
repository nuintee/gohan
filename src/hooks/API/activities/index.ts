// Data
import fs from 'fs'
import path from 'path'
import activities from '@/data/activities/index.json'

// Type
import { Activity, Activities } from '@/data/activities/types'
import { randomUUID } from 'crypto'

export const activitiesTable = {
  getAll: () => activities,
  getByUserId: (userId: string) => activities.find((x) => x.user_id.toString() === userId),
  getById: (userId: string, activityId: string) =>
    activitiesTable.getByUserId(userId).find((x) => x.id === activityId),
}

export const create = (user_id: string, acitivity: Activity) => {
  const newData = {
    user_id,
    activities: [acitivity],
  }
  const id = randomUUID()
  acitivity.id = id

  activities.push(newData)
  saveData()
}

export const _deleteActivity = (user_id: string, id: string) => {
  const index = activities.findIndex((v) => v.user_id === user_id)
  activities[index].activities = activities[index].activities.filter((v) => v.id !== id)
  saveData()
}

function saveData(data: any) {
  fs.writeFileSync(
    path.resolve('src/data/activities/index.json'),
    JSON.stringify(activities, null, 4),
  )
}
