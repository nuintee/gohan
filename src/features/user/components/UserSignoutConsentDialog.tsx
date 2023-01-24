import { Button, Header, Input, Texts } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  onClickAction: React.MouseEventHandler<HTMLButtonElement>
}

const UserSignoutConsentDialog = (props: Props) => {
  const { isOpen, onClose, onClickAction } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white p-4 flex flex-col gap-4'>
        <Texts main='Are you sure?' sub='Singing Out' />
        <div className='flex gap-2'>
          <Button outline text='Cancel' onClick={onClose} />
          <Button text='OK' onClick={onClickAction} />
        </div>
      </section>
    </ModalLayout>
  )
}

export default UserSignoutConsentDialog
