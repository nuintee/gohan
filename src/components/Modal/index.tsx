// Constants
import { version } from '@/../package.json'
import { dictionary, placeholders } from './constants/index'

// Icons
import { Close, Signout } from '@/icons'

// Components
import { Restaurant } from '@/components/Restaurant'

type Props = {
  isOpen: boolean
  type?: keyof typeof dictionary.consent
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

// Component
import Texts from '../Restaurant/Texts'
import { Regular } from '@/components/Button/index'

const Layout = (props: Props) => {
  const { children, isOpen } = props
  return (
    <div
      className={`absolute left-0 top-0 h-screen w-screen ease-in-out flex items-center justify-center bg-black bg-opacity-30 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

const Confirm = (props: Props) => {
  const { isOpen, onClose, type } = props

  const theme = type ? dictionary.consent[type] : placeholders

  return (
    <Layout isOpen={isOpen}>
      <div
        className={`bg-gh-white duration-700 rounded-md min-w-[20rem] ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className='p-4'>
          <Texts size='small' main={theme.title} sub={theme.sub} />
        </div>
        <footer className='flex p-4 gap-2'>
          <Regular outline text={theme.button.cancel.label} onClick={theme.button.cancel.onClick} />
          <Regular text={theme.button.proceed.label} onClick={theme.button.proceed.onClick} />
        </footer>
      </div>
    </Layout>
  )
}

const Details = (props) => {
  const { isOpen, onClose, state } = props

  return (
    <Layout isOpen={isOpen}>
      <section
        className={`bg-gh-white duration-700 rounded-md min-w-[20rem] ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <Restaurant.Large state={state} />
      </section>
    </Layout>
  )
}

const Input = () => {
  return (
    <div className='w-full flex bg-gh-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gh-l-gray'>
      <input
        type={'text'}
        className='flex-1 outline-none px-2 py-1 bg-transparent'
        placeholder='Text'
      />
      <button className='text-sm p-2 text-gh-gray outline-none active:text-black'>Action</button>
    </div>
  )
}

const InputGroup = () => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-gh-gray'>Action</label>
      <Input />
    </div>
  )
}

const User = (props) => {
  const { isOpen, onClose, state } = props

  return (
    <Layout isOpen={isOpen}>
      <section
        className={`bg-white duration-700 rounded-md min-w-[20rem] ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <header className='p-4 flex gap-2 items-center justify-between border-b-[1px] border-gh-l-gray'>
          <p className='font-bold'>User</p>
          <button>
            <Close fill='black' />
          </button>
        </header>
        <main className='p-4 flex flex-col gap-4'>
          <InputGroup />
          <details>
            <summary className='text-gh-gray select-none cursor-pointer'>Advanced</summary>
            <div className='flex flex-col pt-4 gap-2'>
              <Regular danger text='Delete account' />
            </div>
          </details>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Regular text='Signout' />
        </footer>
      </section>
    </Layout>
  )
}

const Modal = {
  Confirm,
  Details,
  User,
  Layout,
}

export default Modal
