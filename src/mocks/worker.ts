const IS_BROWSER = typeof window !== 'undefined'

export const initMocks = async () => {
  if (IS_BROWSER) {
    const { worker } = await import('./browser')
    worker.start()
  } else {
    const { server } = await import('./server')
    server.listen()
  }
}
