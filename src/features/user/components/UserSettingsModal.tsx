import { Button, Header, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

// lib
import dayjs from 'dayjs'

import { User } from 'next-auth'
import UserAuthModal from './UserAuthModal'

type Props = {
  isOpen: boolean
  onClose: Function
  onClickAction: Function
  user: User
}

const UserSettingsModal = (props: Props) => {
  const { isOpen, onClose, user } = props

  if (!user) return <></>

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white'>
        <Header title='Settings' onClose={onClose} />
        <main className='p-4 flex flex-col gap-4'>
          <Input
            placeholder='ex: john0906'
            label='Username'
            value={user.name}
            disabled
            action={{
              label: 'Change',
            }}
          />
          <Input placeholder='ex: john@example.com' label='Email' value={user.email} disabled />
          <Input
            label='Registered at'
            value={dayjs(user.registered_at).format('MMMM D, YYYY h:mm A')}
            disabled
          />
          <details>
            <summary className='text-gh-gray select-none cursor-pointer'>Danger</summary>
            <div className='flex flex-col pt-4 gap-2'>
              <Button text='Delete account' danger />
            </div>
          </details>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='Signout' />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserSettingsModal
