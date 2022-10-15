import Search from '@/components/Button/assets/search.svg'
import Close from '@/components/Button/assets/close.svg'

// Types
import { Props } from '../index.types'

const dictionary = {
  modes: {
    search: Search,
    close: Close,
  } as const,
  type: ['hero', 'support'] as const,
}

const initialStates: Props = {
  mode: 'search',
  loading: false,
  onClick: () => {},
  type: 'hero',
}

export { dictionary, initialStates }
