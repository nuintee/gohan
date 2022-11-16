import { Close, Search, Logo } from '@/icons/index'

// Types
import { Props } from '../index.types'

const dictionary = {
  modes: {
    search: Logo,
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
