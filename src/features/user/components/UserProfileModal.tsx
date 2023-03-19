import { Button, PanelHeader, DetailsSummary } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'

// lib
import dayjs from 'dayjs'

import { signOut, useSession } from 'next-auth/react'

const UserProfileModal = () => {
  const { data: session } = useSession()
  const { isOpen, open, close } = useModals()

  const handleDeleteAccount = () => {
    close('usersettings')
    open('deactivation')
  }

  const profile = [
    {
      label: 'ユーザー名',
      value: session?.user.name,
    },
    {
      label: 'Email',
      value: session?.user.email,
    },
    {
      label: '登録日',
      value: dayjs(session?.user?.registered_at).format('MMMM D, YYYY h:mm A'),
    },
  ]

  if (!session?.user) return <></>

  return (
    <ModalLayout
      isOpen={isOpen('usersettings')}
      onRequestClose={() => close('usersettings')}
      testId={'userprofile__modal'}
    >
      <section className='w-[80vw] max-w-[30rem] bg-white'>
        <PanelHeader title='ユーザー情報' onClose={() => close('usersettings')} />
        <main className='flex flex-col'>
          {profile.map((v) => (
            <div
              className='even:bg-gh-pale bg-white p-4 flex flex-col gap-2 items-start justify-between'
              key={v.label}
            >
              <DetailsSummary summaryTitle={v.label} summaryValue={v.value} allowCopy ignored />
            </div>
          ))}
          <div className='w-full p-4 border-t-[1px]'>
            <DetailsSummary summaryTitle='高度な設定'>
              <Button
                text='退会'
                danger
                onClick={handleDeleteAccount}
                testId='cancelation__button'
              />
            </DetailsSummary>
          </div>
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='ログアウト' onClick={() => signOut()} testId='signout__button' />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserProfileModal
