import { signIn, signOut } from 'next-auth/react'
import { Button, Header, Input, Texts } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

type Props = {
  isOpen: boolean
  type: 'signout' | 'login'
  onClose: React.MouseEventHandler<HTMLButtonElement>
}

const consents = {
  signout: {
    callback: signOut,
    title: '',
    label: 'Signing out',
    okText: 'Signout',
    cancelText: 'Cancel',
  },
  login: {
    callback: () => signIn('auth0'),
    title: 'You must login first',
    label: 'Signing in',
    okText: 'Login',
    cancelText: 'Cancel',
  },
}

const UserAuthConsentDialog = (props: Props) => {
  const { isOpen, onClose, type } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white p-4 flex flex-col gap-4'>
        <Texts main={consents[type]?.title || 'Are you sure?'} sub={consents[type]?.label} />
        <div className='flex gap-2'>
          <Button outline text={consents[type]?.cancelText || 'Cancel'} onClick={onClose} />
          <Button
            text={consents[type]?.okText || 'OK'}
            onClick={() => consents[type]?.callback()}
          />
        </div>
      </section>
    </ModalLayout>
  )
}

export default UserAuthConsentDialog
