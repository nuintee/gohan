import AuthFallback from '@/components/fallback/AuthFallback'
import { MainLayout } from '@/layouts/layout'
import { Providers } from '@/types/index.type'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ReactElement } from 'react'
import { nextAuthOptions } from './api/auth/[...nextauth]'

const SignInPage = ({ providers }: { providers: Providers }) => {
  return <AuthFallback providers={providers} />
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout searchButtonPosition='bottom-center'>{page}</MainLayout>
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)
  const providers = nextAuthOptions(
    ctx?.req as NextApiRequest,
    ctx?.res as NextApiResponse,
  ).providers

  const onlyBasic = providers.map((v) => ({ id: v.id, name: v.name }))

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
      providers: onlyBasic,
    },
  }
}

export default SignInPage
