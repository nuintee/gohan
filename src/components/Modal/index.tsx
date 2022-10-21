// Constants
import { dictionary, placeholders, users } from './constants/index'
import { states } from '@/components/Restaurant/Like/index'

// Icons
import { Close, Signout } from '@/icons'

// Components
import { Restaurant } from '@/components/Restaurant'
import Input from '@/components/Input'
import Header from './Header/index'

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

type Details = {
  isOpen: boolean
  onClose: React.MouseEvent<HTMLButtonElement>
  state: typeof states[number]
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
        <Restaurant.Large state={state} onClick={() => {}} onLike={() => {}} />
      </section>
    </Layout>
  )
}

const User = (props: Props) => {
  const { isOpen, onClose } = props

  return (
    <Layout isOpen={isOpen}>
      <section
        className={`bg-white duration-700 rounded-md min-w-[20rem] ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <Header title='User' onClose={onClose} />
        <main className='p-4 flex flex-col gap-4'>
          {users.map((conf, index) => (
            <Input {...conf} label={conf.label} action={conf.action} key={index} />
          ))}
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
