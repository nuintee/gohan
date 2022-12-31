import { modes } from '../constants'

type Props = {
  isOpen: boolean
  mode: typeof modes[number]
  main: string
  sub?: string
  onClose: React.MouseEventHandler<HTMLButtonElement>
  infinite?: boolean
  timeout?: number // Millisecond
}

export default Props
