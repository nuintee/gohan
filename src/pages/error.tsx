import ErrorFallBack from '@/components/fallback/ErrorFallback'
import { MainLayout } from '@/layouts/layout'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const ErrorPage = () => {
  const router = useRouter()
  const error = (router.query?.error as string) || ''
  return <ErrorFallBack error={new Error(error)} />
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export default ErrorPage
