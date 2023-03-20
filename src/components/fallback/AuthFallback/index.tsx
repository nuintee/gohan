import { Button, Input, SuspenseImage, Texts } from '@/components/ui'
import User from '@/features/user/components/User'

import GoogleButton from 'react-google-button'

import { Providers } from '@/types/index.type'
import { signIn } from 'next-auth/react'

const AuthFallback = ({ providers }: { providers: Providers }) => {
  // return (
  //   <div
  //     className='flex-1 flex flex-col items-center justify-center gap-6'
  //     data-testid='auth__fallback'
  //   >
  //     <SuspenseImage
  //       src='/images/auth_image.svg'
  //       disabled
  //       height={250}
  //       width={250}
  //       draggable={false}
  //     />
  //     <Texts
  //       main='GOHANした場所を全て保存'
  //       sub={'ログインして下さい'}
  //       textAlign={'center'}
  //       size='large'
  //     />
  //     <User />
  //   </div>
  // )

  const pro = {
    ...providers,
    credentials: {
      id: 'credentials',
    },
    google: {
      id: 'google',
    },
  }

  const authUI = (provider: NonNullable<Providers>[string]) => {
    switch (provider.id) {
      case 'credentials':
        return (
          <form className='p-4 flex flex-col gap-4 min-w-[25rem] max-w-full rounded-md'>
            <Input label='メールアドレス' />
            <Input label='パスワード' />
            <Button text='ログイン' />
          </form>
        )
      case 'google':
        return <GoogleButton onClick={() => signIn(provider.id)} lang='ja' />
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
        size='large'
      />
      <div className='flex flex-col gap-2 items-center'>
        {providers &&
          Object.keys(pro)
            ?.sort((a, b) => -1)
            .map((v) => authUI(pro[v]))}
      </div>
    </div>
  )
}

export default AuthFallback
