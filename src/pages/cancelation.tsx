import { Button, Texts } from '@/components/ui'
import useDeleteUser from '@/features/user/hooks/useDeleteUser'
import { MainLayout } from '@/layouts/layout'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const CancelationPage = () => {
  const router = useRouter()

  const userDeletion = useDeleteUser()

  return (
    <div className='h-screen w-screen flex flex-col gap-8 items-center justify-center'>
      <Texts
        main='アカウントを削除をして本当によろしいですか？'
        sub={'保存されているデータは全て削除されます。'}
        textAlign='center'
        size='large'
      />
      <div className='flex gap-4'>
        <Button text='キャンセル' onClick={() => router.back()} outline />
        <Button text='退会' onClick={() => userDeletion.mutate()} danger />
      </div>
    </div>
  )
}

CancelationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default CancelationPage
