export type Props = {
  text: string
  icon?: {
    position: 'before' | 'after'
    src: React.ReactElement
  }
  loading?: boolean
  danger?: boolean
  outline?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}