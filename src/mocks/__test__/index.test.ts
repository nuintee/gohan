// @ts-ignore
import { fetch as fetchPolyfill } from 'whatwg-fetch'

describe('Mock APIs', () => {
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
})
