import { ActivityResolved } from '@/features/activities/types'
import { Activity } from '@prisma/client'
import { MouseEventHandler } from 'react'
import { NEEDED_DETAIL_FIELDS } from '../constants'

export const PLACES_RESPONSE_STATUS = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
  INVALID_REQUEST: 'INVALID_REQUEST',
  OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
  NOT_FOUND: 'NOT_FOUND',
  REQUEST_DENIED: 'REQUEST_DENIED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

export type PlacesSearchStatus = keyof typeof PLACES_RESPONSE_STATUS

export type PlacesDetailsStatus = keyof Omit<typeof PLACES_RESPONSE_STATUS, 'NOT_FOUND'>

export interface PlacesAPI {
  html_attributions: string[]
  results: ResultsEntity[]
  status: PlacesSearchStatus
}

export interface DetailsAPI {
  html_attributions: string[]
  result: ResultsEntity
  status: PlacesDetailsStatus
}

export interface ResultsEntity {
  address_components?: AddressComponent
  adr_address?: string
  business_status?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY'
  formatted_phone_number?: string
  dine_in?: boolean
  delivery?: boolean
  curbside_pickup?: boolean
  geometry?: Geometry
  icon?: string
  icon_background_color?: string
  icon_mask_base_uri?: string
  name?: string
  opening_hours?: OpeningHours
  current_opening_hours?: OpeningHours
  photos?: PhotosEntity[]
  place_id?: string
  plus_code?: PlusCode
  price_level?: 0 | 1 | 2 | 3 | 4
  reviews?: PlaceReview[]
  rating?: number
  reference?: string
  scope?: string
  types?: string[]
  user_ratings_total?: number
  vicinity?: string
  website?: string
  editorial_summary?: PlaceEditorialSummary
  formatted_address?: string
  utc_offset?: number
  secondary_opening_hours?: OpeningHours[]
  reservable?: boolean
  serves_beer?: boolean
  serves_breakfast?: boolean
  serves_brunch?: boolean
  serves_dinner?: boolean
  serves_lunch?: boolean
  serves_vegetarian_food?: boolean
  serves_wine?: boolean
  takeout?: boolean
  wheelchair_accessible_entrance?: boolean
  url?: string
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
  author_url?: string
  language?: string
  original_language?: string
  profile_photo_url?: string
  text?: string
  translated?: boolean
}

export interface PlaceEditorialSummary {
  language?: string
  overview?: string
}

export interface Geometry {
  location: LatLngLiteral
  viewport: Viewport
}
export interface LatLngLiteral {
  lat: number
  lng: number
}
export interface Viewport {
  northeast: LatLngLiteral
  southwest: LatLngLiteral
}
export interface OpeningHours {
  open_now?: boolean
  periods?: PlaceOpeningHoursPeriod[]
  special_days?: PlaceSpecialDay[]
  type?: string
  weekday_text?: []
}

export interface PlaceOpeningHoursPeriod {
  open: PlaceOpeningHoursPeriodDetail
  close?: PlaceOpeningHoursPeriodDetail
}

export interface PlaceOpeningHoursPeriodDetail {
  day: number
  time: string
  date?: string
  truncated?: boolean
}

export interface PlaceSpecialDay {
  date?: string
  exceptional_hours?: boolean
}

export interface PhotosEntity {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}
export interface PlusCode {
  compound_code: string
  global_code: string
}

// Data to pass UI Component
export type RestaurantData = Activity & ResultsEntity

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
