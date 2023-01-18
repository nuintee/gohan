import { dictionary } from './constants/index'

export type Props = {
  mode: keyof typeof dictionary.modes
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  type: typeof dictionary.type[number]
  disabled?: boolean
}
