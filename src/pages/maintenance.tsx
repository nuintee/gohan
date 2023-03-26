import MaintenanceFallback from '@/components/fallback/MaintenanceFallback'
import { IS_MAINTENANCE } from '@/config/env'
import { MainLayout } from '@/layouts/layout'
import { ReactElement } from 'react'

const MaintenancePage = () => {
  return <MaintenanceFallback />
}

MaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout disableSearch={true}>{page}</MainLayout>
}

export function getServerSideProps() {
  if (IS_MAINTENANCE == 'false') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default MaintenancePage
