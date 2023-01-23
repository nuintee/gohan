import axios from '@/libs/axios'

jest.mock('axios')
const moxios = axios as jest.Mocked<typeof axios>

describe('/health', () => {
  test('Status Check', async () => {
    const { data } = await moxios.get('/api/v1/health')
    expect(data).toBe({
      status: 'ok',
    })
  })
})
