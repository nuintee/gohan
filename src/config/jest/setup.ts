import { handlers } from '@/mocks/handlers'
import { server } from '@/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

server.use(...handlers)
