import { Button, PanelHeader, Input, DetailsSummary } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'

// lib
import dayjs from 'dayjs'

import { signOut, useSession } from 'next-auth/react'

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
            label='ユーザー名'
            value={session?.user.name}
            disabled
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
            label='登録日'
            value={dayjs(session?.user?.registered_at).format('MMMM D, YYYY h:mm A')}
            disabled
          />
          <DetailsSummary summaryTitle='高度な設定'>
            <Button text='退会' danger onClick={handleDeleteAccount} />
          </DetailsSummary>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='ログアウト' onClick={() => signOut()} />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserSettingsModal
