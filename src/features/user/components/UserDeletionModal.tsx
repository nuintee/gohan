import { Button, Texts } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'
import { useRef } from 'react'

const UserDeletionModal = () => {
  const { close } = useModals()
  const checkboxRef = useRef(null)

  const handleAccountDeletion = () => {
    if (!checkboxRef.current?.checked) return
  }

  return (
    <ModalLayout isOpen={true}>
      <section className='bg-white p-10 flex flex-col gap-10 border-t-4 border-gh-red'>
        <div className='flex flex-col gap-4'>
          <Texts
            main='アカウントを削除して本当によろしいですか？'
            sub={'保存されているデータは全て削除されます。'}
          />
          <hr></hr>
          <label className='flex gap-2 text-gh-gray'>
            <input type='checkbox' ref={checkboxRef} />
            理解しました。
          </label>
        </div>
        <footer className='flex gap-5'>
          <Button text='キャンセル' outline onClick={() => close()} />
          <Button text='アカウント削除' danger outline={false} disabled />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserDeletionModal
