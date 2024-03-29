import { MockedRequest, DefaultBodyType } from 'msw'

import { IS_BROWSER } from '@/config/mode'

type UnhandledRequestPrint = {
  warning: () => void
  error(): void
}

function onUnhandledRequest(req: MockedRequest<DefaultBodyType>, print: UnhandledRequestPrint) {
  const excludedRoutes = ['/api/v1/restaurants', '/manifest.json', '/logo192.png']

  const isExcluded = excludedRoutes.some((route) => req.url.pathname.includes(route))

  if (isExcluded) {
    return
  }

  print.warning()
}

const initMocks = async () => {
  if (IS_BROWSER) {
    const { worker } = await import('./browser')
    worker.start({
      onUnhandledRequest,
      waitUntilReady: true,
    })
  } else {
    const { server } = await import('./server')
    server.listen({
      onUnhandledRequest,
    })
  }
}

initMocks()
