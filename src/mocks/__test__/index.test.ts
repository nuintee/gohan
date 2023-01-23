import places from '@/data/_places.json'

import { server } from '../server'

// handler
import { handlers } from '../handlers'

// @ts-ignore
import { fetch as fetchPolyfill } from 'whatwg-fetch'

// data

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

server.use(...handlers)

describe('health', () => {
  test('ping: [success]', async () => {
    const res = await fetchPolyfill('/api/v1/health')
    const json = await res.json()
    expect(json).toMatchObject({
      mock: true,
      status: 'ok',
    })
  })
})

describe('restaurants', () => {
  test('places API: [success]', async () => {
    const res = await fetchPolyfill('/api/v1/restaurants?latitude=20&longitude=20')
    const json = await res.json()
    expect(json).toHaveProperty('place_id')
  })
  test('details API: [success]', async () => {
    const res = await fetchPolyfill('/api/v1/restaurants/ChIJ58PFO_yGqkAR1a2dnhgIBiQ')
    const json = await res.json()
    expect(json).toHaveProperty('place_id')
  })
  test('details API: [error]', async () => {
    try {
      const res = await fetchPolyfill('/api/v1/restaurants/INVALID_PLACE_ID')
      const json = await res.json()
      expect(json).toThrowError()
    } catch (error) {}
  })
})

describe('directions', () => {
  test('directions API: [success]', async () => {
    const res = await fetchPolyfill('/api/v1/directions?start=20,20&end=20,20', {
      headers: {
        'x-place-id': 'ChIJsV5xkfyGqkARsB1A1aMTxZs',
      },
    })
    const json = await res.json()
    expect(json).toHaveProperty('routes')
  })
})
