import { server } from './server'
import { worker } from './server'
export {}

const initMocks = async () => {
  if (typeof window === 'undefined') {
    server.listen()
  } else {
    worker.start()
  }
  // コールすることで停止可能に
}

initMocks()
