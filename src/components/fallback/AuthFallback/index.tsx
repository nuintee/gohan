import { Button, Texts } from '@/components/ui'

import GoogleButton from 'react-google-button'

import { Providers } from '@/types/index.type'
import { signIn } from 'next-auth/react'
import useMediaQuery from '@/hooks/mediaquery'
import useToast from '@/libs/react-toastify'
import { useState } from 'react'

const AuthFallback = ({ providers }: { providers: Providers }) => {
  const isOverSmall = useMediaQuery('sm')
  const [isSignInProccess, setIsSignInProccess] = useState(false)

  const handleLogin = async (id: keyof NonNullable<Providers>) => {
    setIsSignInProccess(true)
    const signinResult = await signIn(id)

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
          <div className='w-full'>
            <Button
              text='ゲストログイン'
              onClick={() => handleLogin(provider.id)}
              icon={{ position: 'before', src: <></> }}
              loading={isSignInProccess}
            />
            <Texts sub={'とりあえず使ってみたい方に最適です。'} />
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
        {providers &&
          Object.keys(providers)
            ?.sort((_a, _b) => 1)
            .map((v) => authUI(providers[v]))}
      </div>
    </div>
  )
}

export default AuthFallback
