import { ActivityResolved } from '@/features/activities/types'
import { Activity } from '@prisma/client'
import { MouseEventHandler } from 'react'
import { neededDetailsFields } from '../constants'

export type PlacesSearchStatus = [
  'OK',
  'ZERO_RESULTS',
  'INVALID_REQUEST',
  'OVER_QUERY_LIMIT',
  'REQUEST_DENIED',
  'UNKNOWN_ERROR',
]

export interface PlacesAPI {
  html_attributions?: null[] | null
  results?: ResultsEntity[] | null
  status: PlacesSearchStatus[number]
}

export interface DetailsAPI {
  html_attributions?: null[] | null
  result?: ResultsEntity | null
  status: PlacesSearchStatus[number]
}

export interface ResultsEntity {
  address_components?: AddressComponent
  business_status: string
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  opening_hours?: OpeningHours | null
  photos?: PhotosEntity[] | null
  place_id: string
  plus_code: PlusCode
  price_level?: 0 | 1 | 2 | 3 | 4 | null
  reviews: PlaceReview | null
  rating: number
  reference: string
  scope: string
  types: string[] | null
  user_ratings_total: number
  vicinity: string
  website: string | null
  editorial_summary: PlaceEditorialSummary | null
  formatted_address: string | null
  url: string | null // Applications must link to or embed this page on any screen that shows detailed results about the place to the user.
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface PlaceReview {
  author_name: string
  rating: number
  relative_time_description: string
  time: number
  author_url: string | null
  language: string | null
  original_language: string | null
  profile_photo_url: string | null
  text: string | null
  translated: boolean | null
}

export interface PlaceEditorialSummary {
  language?: string
  overview?: string
}

export interface Geometry {
  location: NortheastOrSouthwestOrLocation
  viewport: Viewport
}
export interface NortheastOrSouthwestOrLocation {
  lat: number
  lng: number
}
export interface Viewport {
  northeast: NortheastOrSouthwestOrLocation
  southwest: NortheastOrSouthwestOrLocation
}
export interface OpeningHours {
  open_now: boolean | null
  periods: PlaceOpeningHoursPeriod[] | null
  special_days: PlaceSpecialDay[] | null
  type: string | null
  weekday_text: [] | null
}

export interface PlaceOpeningHoursPeriod {
  open: PlaceOpeningHoursPeriodDetail
  close: PlaceOpeningHoursPeriodDetail | null
}

export interface PlaceOpeningHoursPeriodDetail {
  day: number
  time: string
  date: string | null
  truncated: boolean | null
}

export interface PlaceSpecialDay {
  date: string | null
  exceptional_hours: boolean | null
}

export interface PhotosEntity {
  height: number
  html_attributions?: string[] | null
  photo_reference: string
  width: number
}
export interface PlusCode {
  compound_code: string
  global_code: string
}

// Data to pass UI Component
export type RestaurantData = Activity & Pick<ResultsEntity, typeof neededDetailsFields[number]>

// Data to pass Renderer
export type RestaurantProps = {
  isLocked: boolean
  isLoading?: boolean
  isFocused?: boolean
  data?: ActivityResolved // includes status
  distance?: string
  onLike?: MouseEventHandler<HTMLButtonElement>
  onClick?: MouseEventHandler<HTMLButtonElement>
  onNavigate?: (activity: ActivityResolved) => void
}
