import { handlers } from '@/mocks/handlers'
import { server } from '@/mocks/server'
import 'whatwg-fetch'

global.console = {
  ...console,
  // log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

jest.mock('src/pages/api/auth/[...nextauth].ts', () => ({
  __esModule: true,
  default: {},
}))

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

server.use(...handlers)
