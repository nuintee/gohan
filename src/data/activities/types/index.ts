type Activity = {
  id: string
  cover_image: string
  discovered_time: string
  description: string
  link: string
  is_liked: boolean
  address: string
  coordinates: number[]
}

type Activities = {
  id: string
  activity: Activity
}[]

export { Activity, Activities }
