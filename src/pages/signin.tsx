import AuthFallback from '@/components/fallback/AuthFallback'
import { MainLayout } from '@/layouts/layout'
import { ReactElement } from 'react'

const SignInPage = () => {
  return <AuthFallback />
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout searchButtonPosition='bottom-center'>{page}</MainLayout>
}

export default SignInPage
