import { Texts } from '@/components/ui'
import User from '@/features/user/components/User'

const AuthFallback = () => {
  return (
    <>
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
        <User />
      </div>
    </>
  )
}

export default AuthFallback
