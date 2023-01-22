import { Button, Header, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

import { User } from 'next-auth'

type Props = {
  isOpen: boolean
  onClose: Function
  onClickAction: Function
  user: User
}

{
  /* <section
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
      </section> */
}

const UserSettingsModal = (props: Props) => {
  const { isOpen, onClose, user } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white'>
        <Header title='User' onClose={onClose} />
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
          <Input label='Registered at' value={user.registered_at} disabled />
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
