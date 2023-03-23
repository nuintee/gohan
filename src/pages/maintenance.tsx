import MaintenanceFallback from '@/components/fallback/MaintenanceFallback'
import { MainLayout } from '@/layouts/layout'
import { ReactElement } from 'react'

const MaintenancePage = () => {
  return <MaintenanceFallback />
}

MaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export default MaintenancePage
