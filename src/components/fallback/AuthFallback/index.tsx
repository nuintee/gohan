import { Button, Texts } from '@/components/ui'

import GoogleButton from 'react-google-button'

import { Providers } from '@/types/index.type'
import { signIn } from 'next-auth/react'
import useMediaQuery from '@/hooks/mediaquery'
import useToast from '@/libs/react-toastify'
import { useState } from 'react'
import ToolTip from '@/components/ui/Tootltip'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/config/env'

const AuthFallback = ({ providers }: { providers: Providers }) => {
  const isOverSmall = useMediaQuery('sm')
  const [isSignInProccess, setIsSignInProccess] = useState(false)
  const router = useRouter()
  const referer = router.query?.referer || ''

  const handleLogin = async (id: keyof NonNullable<Providers>) => {
    setIsSignInProccess(true)
    const signinResult = await signIn(id, {
      ...(referer && { callbackUrl: `${BASE_URL}/${referer}` }),
    })

    if (signinResult?.ok) {
      setIsSignInProccess(false)
    } else if (signinResult?.error) {
      useToast.error('ログインに失敗しました。')
    }
  }

  const authUI = (provider: NonNullable<Providers>[string]) => {
    switch (provider.id) {
      case 'credentials':
        return (
          <div className='w-full flex flex-col gap-2'>
            <Button
              text='ゲストログイン'
              onClick={() => handleLogin(provider.id)}
              icon={{ position: 'before', src: <></> }}
              loading={isSignInProccess}
            />
            <Texts
              sub={'ゲストログインとは?'}
              subDecoration={
                <ToolTip text={`とりあえず使ってみるのに最適な体験用アカウントです。`} />
              }
              subJustify='justify-center'
            />
          </div>
        )
      case 'google':
        return (
          <GoogleButton
            onClick={() => handleLogin(provider.id)}
            lang='ja'
            type='light'
            label='Googleアカウントでログイン'
            style={{
              width: '100%',
            }}
          />
        )
      default:
        return <button>Signin with {provider.id}</button>
    }
  }

  return (
    <div
      className='flex-1 flex flex-col items-center justify-center gap-6'
      data-testid='auth__fallback'
    >
      <Texts
        main='GOHANした場所を全て保存'
        sub={'ログインして下さい'}
        textAlign={'center'}
        size={isOverSmall ? 'large' : 'normal'}
      />
      <div className='flex flex-col gap-8 items-center p-2 w-full max-w-[20rem]'>
        <Button text='コードでログイン' outline />
        <hr className=' border-gh-white w-full h-[1px]'></hr>
        {providers &&
          Object.keys(providers)
            ?.sort((_a, _b) => 1)
            .map((v) => authUI(providers[v]))}
      </div>
    </div>
  )
}

export default AuthFallback
