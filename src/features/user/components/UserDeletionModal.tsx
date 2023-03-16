import { Button, Texts } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'
import useToast from '@/libs/react-toastify'
import { useState } from 'react'
import useDeleteUser from '../hooks/useDeleteUser'

const UserDeletionModal = () => {
  const { close, isOpen } = useModals()
  const [isChecked, setIsChecked] = useState(false)

  const deleteQuery = useDeleteUser()

  const handleAccountDeletion = async () => {
    if (!isChecked) return

    deleteQuery.mutate(undefined, {
      onSuccess: () => {
        useToast.success('アカウントを削除しました。')
      },
    })
  }

  return (
    <ModalLayout isOpen={isOpen('deactivation')} testId='cancelation__modal'>
      <section className='bg-white sm:p-10 p-4 flex flex-col gap-10 border-t-4 border-gh-red  w-[90vw] max-w-[30rem] sm:text-base text-sm'>
        <div className='flex flex-col gap-4'>
          <Texts
            main='アカウントを削除して本当によろしいですか？'
            sub={'保存されているデータは全て削除されます。'}
          />
          <hr className=' fill-red-200 border-gh-white'></hr>
          <div className='flex gap-2 h-fit'>
            <input
              type='checkbox'
              onChange={(e) => setIsChecked(e.target.checked)}
              className='bg-red-200'
            />
            <label className='flex gap-2 text-gh-gray'>理解しました。</label>
          </div>
        </div>
        <footer className='flex gap-5'>
          <Button text='キャンセル' outline onClick={() => close('deactivation')} />
          <Button
            text='アカウント削除'
            danger
            outline={false}
            disabled={!isChecked}
            onClick={handleAccountDeletion}
          />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserDeletionModal
