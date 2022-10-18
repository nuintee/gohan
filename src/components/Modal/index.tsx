// Constants
import { dictionary, placeholders } from './constants/index'

type Props = {
  isOpen: boolean
  type?: keyof typeof dictionary.consent
  onClose: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

// Component
import Texts from '../Restaurant/Texts'
import { Regular } from '@/components/Button/index'

const Confirm = (props: Props) => {
  const { isOpen, onClose, children, type } = props

  const theme = type ? dictionary.consent[type] : placeholders

  return (
    <div
      className={`absolute left-0 top-0 h-screen w-screen ease-in-out flex items-center justify-center bg-black bg-opacity-30 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children || (
        <div className={`bg-gh-white duration-700 rounded-md ${isOpen ? 'scale-100' : 'scale-0'}`}>
          <div className='p-4'>
            <Texts size='small' main={theme.title} sub={theme.sub} />
          </div>
          <footer className='flex p-4 gap-2'>
            <Regular
              outline
              text={theme.button.cancel.label}
              onClick={theme.button.cancel.onClick}
            />
            <Regular text={theme.button.proceed.label} onClick={theme.button.proceed.onClick} />
          </footer>
        </div>
      )}
    </div>
  )
}

const Details = () => {}

const Actions = () => {}

const Modal = {
  Confirm,
}

export default Modal
