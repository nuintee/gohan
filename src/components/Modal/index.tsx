// Constants
import { dictionary, placeholders, users } from './constants/index'
import { states } from '@/components/Restaurant/Like/index'

// Icons
import { Close, Signout } from '@/icons'

// Components
import Restaurant from '@/components/Restaurant'
import Input from '@/components/Input'
import Header from './Header/index'

// Hooks
import useModals from '@/hooks/context/Modals'

// Types
import { ResultsEntity } from '@/hooks/API/Places/types/index.types'

type Props = {
  isOpen: boolean
  type?: keyof typeof dictionary.consent
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

// Component
import Texts from '../Restaurant/Texts'
import { Regular } from '@/components/Button/index'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Tab from '../Tab'
import { useMapBox } from '@/hooks/context'
import { RestaurantProps } from '@/types/Restaurant'
import useGPS from '@/hooks/context/GPS'

const tabs = [
  {
    label: 'Signin',
    id: 0,
  },
  {
    label: 'Singup',
    id: 1,
  },
]

const Layout = (props: Props) => {
  const { children, isOpen } = props
  return (
    <div
      className={`absolute left-0 top-0 h-screen w-screen ease-in-out flex items-center justify-center bg-black bg-opacity-30 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
          <Regular outline text={theme.button.cancel.label} onClick={onClose} />
          <Regular text={theme.button.proceed.label} onClick={theme.button.proceed.onClick} />
        </footer>
      </div>
    </Layout>
  )
}

type DetailsType = {
  isOpen: boolean
  onClose: React.MouseEvent<HTMLButtonElement, MouseEvent>
  onNavigate: React.MouseEvent<HTMLButtonElement, MouseEvent>
  state: typeof states[number]
  data: ResultsEntity
  isLoading: boolean
}

const Details = (props: DetailsType) => {
  const { isOpen, onClose, data, isNavigating } = props
  const { clearRoute, drawRoute } = useMapBox()
  const { status } = useSession()

  const clickHandle = () => {
    // CloseModal
    if (isNavigating) {
      clearRoute()
    } else {
      // Restaurant Coords
      const geometry = data?.geometry?.location
      const route = { latitude: geometry?.lat, longitude: geometry?.lng }
      drawRoute(route, data?.place_id)
    }
  }

  return (
    <Layout isOpen={isOpen}>
      <section
        className={`bg-gh-white duration-700 rounded-md min-w-[20rem] ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <Restaurant
          data={data}
          mode='large'
          onClose={onClose}
          isNavigating={isNavigating}
          onClick={clickHandle}
          isLocked={status !== 'authenticated'}
        />
      </section>
    </Layout>
  )
}

const User = (props: Props) => {
  const { isOpen, onClose } = props
  const { data: session } = useSession()
  const [selecteTabId, setSelectedTabId] = useState(0)

  if (!session) {
    return (
      <Layout isOpen={isOpen}>
        <section
          className={`bg-white duration-700 rounded-md min-w-[20rem] ${
            isOpen ? 'scale-100' : 'scale-0'
          }`}
        >
          <Header title='Signup' onClose={onClose} />
          <Tab tabs={tabs} selectedId={selecteTabId} onSelect={(id) => setSelectedTabId(id)} />
          <main className='p-4 flex flex-col gap-4'>
            {users.map((conf, index) => (
              <Input {...conf} label={conf.label} action={conf.action} key={index} />
            ))}
          </main>
          <hr></hr>
          <footer className='p-4 flex flex-col gap-2'>
            <Regular text='Signup' />
          </footer>
        </section>
      </Layout>
    )
  }

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
