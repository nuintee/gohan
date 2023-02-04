// @ts-ignore

describe('Mock APIs', () => {
  describe('health', () => {
    test('ping', async () => {
      const res = await fetch('/api/v1/health')
      const json = await res.json()
      expect(json).toMatchObject({
        mock: true,
        status: 'ok',
      })
    })
  })
})
