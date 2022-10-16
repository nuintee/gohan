import { Close, Search } from '@/icons/index'

// Types
import { Props } from '../index.types'

const dictionary = {
  modes: {
    search: Search,
    close: Close,
  },
  type: ['hero', 'support'] as const,
}

const initialStates: Props = {
  mode: 'search',
  loading: false,
  onClick: () => {},
  type: 'hero',
}

export { dictionary, initialStates }
