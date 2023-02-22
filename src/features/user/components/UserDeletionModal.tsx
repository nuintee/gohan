import { Button, Texts } from '@/components/ui'
import useModals from '@/hooks/modals'
import ModalLayout from '@/layouts/ModalLayout'
import { useRef, useState } from 'react'

const UserDeletionModal = () => {
  const { close } = useModals()
  const [isChecked, setIsChecked] = useState(false)

  const handleAccountDeletion = () => {
    if (!isChecked) return console.log('NO_CHECK')

    console.log('Delete')
  }

  return (
    <ModalLayout isOpen={true}>
      <section className='bg-white p-10 flex flex-col gap-10 border-t-4 border-gh-red'>
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
          <Button text='キャンセル' outline onClick={() => close()} />
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
