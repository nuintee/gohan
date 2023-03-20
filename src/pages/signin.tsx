import AuthFallback from '@/components/fallback/AuthFallback'
import { MainLayout } from '@/layouts/layout'
import { Providers } from '@/types/index.type'
import { getProviders } from 'next-auth/react'
import { ReactElement } from 'react'

const SignInPage = ({ providers }: { providers: Providers }) => {
  return <AuthFallback providers={providers} />
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout searchButtonPosition='bottom-center'>{page}</MainLayout>
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  }
}

export default SignInPage
