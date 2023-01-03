// Data
import fs from 'fs'
import path from 'path'
import activities from '@/data/activities/index.json'

export const activitiesTable = {
  getAll: () => activities,
  getByUserId: (userId: string) => activities[userId],
  getById: (userId: string, activityId: string) =>
    activitiesTable.getByUserId(userId).find((x) => x.id === activityId),
}

export const create = (acitivity) => {
  // generate new user id
  acitivity.id = Object.keys(activities).length + 1

  // set date created and updated
  acitivity.dateCreated = new Date().toISOString()
  acitivity.dateUpdated = new Date().toISOString()

  // add and save user
  activities[acitivity.id] = [acitivity]
  saveData()
}

export const _deleteActivity = (userId, id) => {
  // filter out deleted user and save
  activities[userId] = activities[userId].filter((v) => v.id !== id)

  saveData()
}

function saveData() {
  fs.writeFileSync(
    path.resolve('src/data/activities/index.json'),
    JSON.stringify(activities, null, 4),
  )
}
