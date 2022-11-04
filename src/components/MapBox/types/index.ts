export type MapBoxInit = {
  lng?: number | null
  lat?: number | null
  zoom?: number | null
  pitch?: number | null
  bearing?: number | null
  error?: {
    is: boolean
    message: string
  }
}
