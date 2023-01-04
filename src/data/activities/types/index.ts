import { ResultsEntity } from '@/hooks/API/Places/types/index.types'

type Activity = {
  id: string
} & ResultsEntity

type Activities = {
  id: string
  activity: Activity
}[]

export { Activity, Activities }
