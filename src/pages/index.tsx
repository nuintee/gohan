import { MainLayout } from '@/layouts/layout'
import SearchLayout from '@/features/search/layouts/SearchLayout'
import { ReactElement } from 'react'

const Index = () => {
  return <SearchLayout />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export default Index
