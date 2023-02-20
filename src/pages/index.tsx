import type { NextPageContext } from 'next'

import Header from '@/components/ui/Header'

import { MainLayout } from '@/layouts/layout'
import SearchLayout from '@/features/search/components/SearchLayout'
import { ReactElement } from 'react'

const Index = () => {
  return <SearchLayout />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default Index
