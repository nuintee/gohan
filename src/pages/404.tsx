import ErrorFallBack from '@/components/fallback/ErrorFallback'
import { MainLayout } from '@/layouts/layout'
import { ReactElement } from 'react'

const NotFound = () => {
  return <ErrorFallBack error={new Error('ページが見つかりませんでした。')} />
}

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export default NotFound
