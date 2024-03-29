export const MAPBOX_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN as string
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const AXIOS_FETCH_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT as string)

export const IS_DEVMODE = process.env.NODE_ENV === 'development'
export const IS_TESTMODE = process.env.NODE_ENV === 'test'
export const IS_PRODMODE = process.env.NODE_ENV === 'production'

export const GCP_API_KEY = process.env.GCP_API_KEY as string
export const GCP_CLIENT_ID = process.env.GCP_CLIENT_ID as string
export const GCP_CLIENT_SECRET = process.env.GCP_CLIENT_SECRET as string

export const APP_SECRET = process.env.APP_SECRET
export const IS_STAGING = process.env.IS_STAGING
export const IS_MAINTENANCE = process.env.NEXT_PUBLIC_IS_MAINTENANCE

export const FALLBACK_IMAGE = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || '/images/fallback_image.svg'

export const REVALIDATION_THRESHOLD =
  parseInt(process.env.REVALIDATION_REQUESTS_THRESHOLD as string) || 5
