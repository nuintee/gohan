export const MAPBOX_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN as string
export const GCP_API_KEY = process.env.NEXT_PUBLIC_GCP_API_KEY as string
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const AXIOS_FETCH_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT as string)
export const IS_DEVMODE = process.env.NODE_ENV === 'development'
export const IS_TESTMODE = process.env.NODE_ENV === 'test'
export const IS_PRODMODE = process.env.NODE_ENV === 'production'
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string
export const AUTH0_CLIENT_SECRET = process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET as string
export const AUTH0_ISSUER = process.env.NEXT_PUBLIC_AUTH0_ISSUER as string
export const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string
export const AUTH0_AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string
export const GCP_CLIENT_ID = process.env.NEXT_PUBLIC_GCP_CLIENT_ID as string
export const GCP_CLIENT_SECRET = process.env.NEXT_PUBLIC_GCP_CLIENT_SECRET as string
export const NEXT_AUTH_SECRET = process.env.NEXT_PUBLIC_AUTH_SECRET
