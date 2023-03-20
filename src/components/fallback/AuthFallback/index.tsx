import { SuspenseImage, Texts } from '@/components/ui'
import User from '@/features/user/components/User'
import { Providers } from '@/types/index.type'

const AuthFallback = ({ providers }: { providers: Providers }) => {
  return (
    <>
      <div
        className='flex-1 flex flex-col items-center justify-center gap-6'
        data-testid='auth__fallback'
      >
        <SuspenseImage
          src='/images/auth_image.svg'
          disabled
          height={250}
          width={250}
          draggable={false}
        />
        <Texts
          main='GOHANした場所を全て保存'
          sub={'ログインして下さい'}
          textAlign={'center'}
          size='large'
        />
        <User />
      </div>
      <pre>{JSON.stringify(providers)}</pre>
    </>
  )
}

export default AuthFallback
