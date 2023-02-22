import { MainLayout } from '@/layouts/layout'
import { ReactElement } from 'react'

const AuthPage = () => {
  return <>Auth</>
}

AuthPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default AuthPage
