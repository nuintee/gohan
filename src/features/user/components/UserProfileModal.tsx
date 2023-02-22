import { Button, PanelHeader, Input } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'

// lib
import dayjs from 'dayjs'

import { User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useDeleteUser from '../hooks/useDeleteUser'

const UserSettingsModal = () => {
  const { data: session } = useSession()
  const { isOpen, open, close } = useModals()

  const handleDeleteAccount = () => {
    close('usersettings')
    open('deactivation')
  }

  if (!session?.user) return <></>

  return (
    <ModalLayout isOpen={isOpen('usersettings')}>
      <section className='min-w-[20rem] bg-white'>
        <PanelHeader title='プロフィール' onClose={() => close('usersettings')} />
        <main className='p-4 flex flex-col gap-4'>
          <Input
            registerName='settings-username'
            required={false}
            placeholder='ex: john0906'
            label='Username'
            value={session?.user.name}
            disabled
            action={{
              label: 'Change',
              onClick: () => {
                return {}
              },
            }}
          />
          <Input
            registerName='settings-email'
            required={false}
            placeholder='ex: john@example.com'
            label='Email'
            value={session?.user.email}
            disabled
          />
          <Input
            registerName='settings-registered_date'
            required={false}
            label='Registered at'
            value={dayjs(session?.user?.registered_at).format('MMMM D, YYYY h:mm A')}
            disabled
          />
          <details>
            <summary className='text-gh-gray select-none cursor-pointer'>高度な設定</summary>
            <div className='flex flex-col pt-4 gap-2'>
              <Button text='Delete account' danger onClick={handleDeleteAccount} />
            </div>
          </details>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='Signout' onClick={() => signOut} />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserSettingsModal
