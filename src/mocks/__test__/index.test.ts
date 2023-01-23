import { server } from '../server'

// handler
import { handlers } from '../handlers'

// @ts-ignore
import { fetch as fetchPolyfill } from 'whatwg-fetch'

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
    const res = await fetchPolyfill('/api/v1/restaurants')
    const json = await res.json()
    expect(json).toBeDefined()
  })
  test('details API: [success]', async () => {
    const res = await fetchPolyfill('/api/v1/restaurants/ChIJ58PFO_yGqkAR1a2dnhgIBiQ')
    const json = await res.json()
    expect(json).toBeDefined()
  })
  test('details API: [error]', async () => {
    const res = await fetchPolyfill('/api/v1/restaurants/INVALID_PLACE_ID')
    console.log(res)
    const json = await res.json()
    expect(json).toThrowError()
  })
})
