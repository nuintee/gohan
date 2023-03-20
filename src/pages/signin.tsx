import AuthFallback from '@/components/fallback/AuthFallback'
import { MainLayout } from '@/layouts/layout'
import { Providers } from '@/types/index.type'
import { getProviders, getSession, GetSessionParams } from 'next-auth/react'
import { ReactElement } from 'react'

const SignInPage = ({ providers }: { providers: Providers }) => {
  return <AuthFallback providers={providers} />
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout searchButtonPosition='bottom-center'>{page}</MainLayout>
}

export async function getServerSideProps(ctx: GetSessionParams | undefined) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers: await getProviders(),
    },
  }
}

export default SignInPage
