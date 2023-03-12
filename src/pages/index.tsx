import { MainLayout } from '@/layouts/layout'
import SearchLayout from '@/features/search/layouts/SearchLayout'
import { ReactElement } from 'react'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'

const Index = () => {
  return (
    <>
      <Head title={ROUTES.HOME.label} />
      <SearchLayout />
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export default Index
