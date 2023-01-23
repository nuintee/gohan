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
  test('ping', async () => {
    const res = await fetchPolyfill('/api/v1/health')
    const json = await res.json()
    expect(json).toMatchObject({
      mock: true,
      status: 'ok',
    })
  })
})

describe('restaurants', () => {
  test('places API', async () => {
    const res = await fetchPolyfill('/api/v1/restaurants')
    const json = await res.json()
    expect(json).toMatchObject({
      mock: true,
      status: 'ok',
    })
  })
  test('details API', async () => {})
})
