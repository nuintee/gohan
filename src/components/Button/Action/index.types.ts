import { dictionary } from './constants/index'

export type Props = {
  icon: keyof typeof dictionary.icons
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  type: typeof dictionary.type[number]
}
