import { Button, PanelHeader, Input } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'

// lib
import dayjs from 'dayjs'

import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import useDeleteUser from '../hooks/useDeleteUser'

type Props = {
  isOpen?: boolean
  onClose?: Function
  onClickAction?: React.MouseEventHandler<HTMLButtonElement>
  user: User
}

const UserSettingsModal = (props: Props) => {
  const { data: session } = useSession()
  const { isOpen: isSettingsOpen, close } = useModals()

  const {
    isOpen = isSettingsOpen('usersettings') ?? false,
    onClose = () => close('usersettings'),
    user = session?.user ?? {},
  } = props

  const userDeletion = useDeleteUser()

  if (!user) return <></>

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white'>
        <PanelHeader title='プロフィール' onClose={onClose} />
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
            <summary className='text-gh-gray select-none cursor-pointer'>高度な設定</summary>
            <div className='flex flex-col pt-4 gap-2'>
              <Button
                text='Delete account'
                danger
                onClick={() => userDeletion.mutate()}
                loading={userDeletion.isLoading}
              />
            </div>
          </details>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='Signout' onClick={signOut} />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserSettingsModal
