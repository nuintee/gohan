import { ResultsEntity } from '@/hooks/API/Places/types/index.types'

type Activity = {
  id: string
  is_liked: boolean
} & ResultsEntity

type Activities = {
  user_id: string
  activity: Activity[]
}[]

export { Activity, Activities }
