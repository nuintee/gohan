import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { STAGING } from './config/env'

const BASIC_AUTH_USER = 'USER'
const BASIC_AUTH_PASSWORD = 'PSSWRD'

export const middleware = (req: NextRequest) => {
  if (STAGING !== 'true') return NextResponse.next()

  const authorizationHeader = req.headers.get('authorization')

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1]
    const [user, password] = Buffer.from(basicAuth, 'base64').toString().split(':')

    if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  }

  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
