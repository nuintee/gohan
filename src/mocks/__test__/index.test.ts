import { server } from '../server'
import { fetch as fetchPolyfill } from 'whatwg-fetch'

// resolvers
import healthResolver from '../resolvers/healthResolver'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers(healthResolver))

// Clean up after the tests are finished.
afterAll(() => server.close())

describe('<FancyHomePage />', () => {
  test('displays homepage data', async () => {
    // Render homepage with backend data
    const data = await fetchPolyfill('http://localhost:3000/api/v1/health')
  })
})
