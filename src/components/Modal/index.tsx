type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

// Component
import Texts from '../Restaurant/Texts'
import { Regular } from '@/components/Button/index'

const Confirm = (props: Props) => {
  const { isOpen, onClose, children } = props

  return (
    <div
      className={`absolute left-0 top-0 h-screen w-screen ease-in-out flex items-center justify-center bg-black bg-opacity-30 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className={`bg-gh-white duration-700 rounded-md ${isOpen ? 'scale-100' : 'scale-0'}`}>
        {/* <header className='flex gap-2 p-4 w-full justify-between'>
          <p>HEADER</p>
          <button>X</button>
        </header> */}
        <div className='p-4'>
          <Texts size='small' />
        </div>
        <footer className='flex p-4 gap-2'>
          <Regular />
          <Regular />
        </footer>
      </div>
    </div>
  )
}

const Details = () => {}

const Actions = () => {}

const Modal = {
  Confirm,
}

export default Modal
