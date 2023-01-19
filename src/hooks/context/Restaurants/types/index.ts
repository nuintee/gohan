export interface PlacesAPI {
  html_attributions?: null[] | null
  results?: ResultsEntity[] | null
  status: string
}

export interface DetailsAPI {
  html_attributions?: null[] | null
  result?: ResultsEntity[] | null
  status: string
}

export interface ResultsEntity {
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
  price_level?: number | null
  rating: number
  reference: string
  scope: string
  types?: string[] | null
  user_ratings_total: number
  vicinity: string
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
  open_now: boolean
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
