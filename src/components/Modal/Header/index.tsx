import { Close } from '@/icons'

type Props = {
  title?: string
  onClose?: React.MouseEventHandler<HTMLButtonElement>
}

const Header = (props: Props) => {
  const { title, onClose } = props

  return (
    <header className='p-4 flex gap-2 items-center justify-between border-gh-l-gray'>
      <p className='font-bold'>{title || 'TITLE'}</p>
      <button onClick={onClose}>
        <Close fill='black' />
      </button>
    </header>
  )
}

export default Header
